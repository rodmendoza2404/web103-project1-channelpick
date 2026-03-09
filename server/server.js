import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import channelsRouter from './routes/channels.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, 'public')))
app.use('/scripts', express.static(path.join(__dirname, 'public/scripts')))

app.use('/channels', channelsRouter)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'))
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})