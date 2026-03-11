import { pool } from '../config/database.js'

const getChannels = async (req, res) => {
  try {
    const results = await pool.query(`
      SELECT
        id,
        slug,
        name,
        category,
        description,
        image,
        whywatch AS "whyWatch",
        channellink AS "channelLink",
        submittedby AS "submittedBy"
      FROM channels
      ORDER BY id ASC
    `)
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getChannels
}