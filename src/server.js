const express = require('express')
const CONFIG = require('./config')
const File = require('./models/file.js')
const Rewiew = require('./models/rewiew')
const {
	checkDatabaseExists,
	checkSequelizeConnection,
} = require("./database.js");

const app = express()
const port = CONFIG.server_port
const file_router = require('./routes/file_router');
const rewiew_router = require('./routes/rewiew_router');

app.use(express.json())

app.use('/files', file_router)
app.use('/rewiews', rewiew_router)



async function startServer() {
	try {
		await connectToDatabase()
		app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`))
	} catch (e) {
		console.error(`Ошибка при запуске сервера: ${e}`)
	}
}

async function connectToDatabase() {
	try {
		await checkDatabaseExists()
		await checkSequelizeConnection()

		await File.sync()
		console.log("Модель файлов синхронизирована");
		await Rewiew.sync()
		console.log("Модель отзывов синхронизирована");

	} catch (error) {
		throw error
	}
}


startServer()