import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import channels from '../data/channels.js'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


function chooseFile(serverRelativePath, clientRelativePath) {
  const serverPath = path.join(__dirname, '..', 'public', serverRelativePath)
  const clientPath = path.join(__dirname, '..', '..', 'client', clientRelativePath)
  return fs.existsSync(serverPath) ? serverPath : clientPath
}

router.get('/', (req, res) => {
  res.status(200).json(channels)
})

router.get('/:slug', (req, res) => {
  const channel = channels.find(item => item.slug === req.params.slug)

  
  const notFoundPath = chooseFile('404.html', '404.html')

  if (!channel) {
    return res.status(404).sendFile(notFoundPath)
  }

  
  const channelPagePath = chooseFile('channel.html', 'channel.html')

  return res.status(200).sendFile(channelPagePath)
})

export default router
