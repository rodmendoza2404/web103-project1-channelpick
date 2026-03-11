import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import ChannelsController from '../controllers/channels.js'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

router.get('/', ChannelsController.getChannels)

router.get('/:slug', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/channel.html'))
})

export default router