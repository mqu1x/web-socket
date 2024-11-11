import express from 'express'
import http from 'http'
import { dirname } from 'path'
import { Server } from 'socket.io'
import { fileURLToPath } from 'url'

let usersAmount = 0

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const __dirname = dirname(fileURLToPath(import.meta.url))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', client => {
	usersAmount++
	console.log(`пользователь подключился, кол-во пользователей ${usersAmount}`)

	client.on('disconnect', () => {
		usersAmount--
		console.log(`пользователь отключился, кол-во пользователей ${usersAmount}`)
	})
})

const PORT = 9999
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
