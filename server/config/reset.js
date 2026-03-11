import './dotenv.js'
import { pool } from './database.js'
import channelData from '../data/channels.js'

const createChannelsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS channels;

    CREATE TABLE IF NOT EXISTS channels (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      whyWatch TEXT NOT NULL,
      channelLink TEXT NOT NULL,
      submittedBy VARCHAR(255) NOT NULL
    )
  `

  try {
    await pool.query(createTableQuery)
    console.log('🎉 channels table created successfully')
  } catch (err) {
    console.error('⚠️ error creating channels table', err)
    throw err
  }
}

const seedChannelsTable = async () => {
  await createChannelsTable()

  for (const channel of channelData) {
    const insertQuery = {
      text: `
        INSERT INTO channels
        (slug, name, category, description, image, whyWatch, channelLink, submittedBy)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `
    }

    const values = [
      channel.slug,
      channel.name,
      channel.category,
      channel.description,
      channel.image,
      channel.whyWatch,
      channel.channelLink,
      channel.submittedBy
    ]

    try {
      await pool.query(insertQuery, values)
      console.log(`✅ ${channel.name} added successfully`)
    } catch (err) {
      console.error('⚠️ error inserting channel', err)
      throw err
    }
  }
}

const runReset = async () => {
  try {
    await seedChannelsTable()
  } catch (err) {
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

runReset()