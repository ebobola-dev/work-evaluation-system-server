const express = require('express')
const file_upload = require('express-fileupload');
const CONFIG = require('./config')
const File = require('./models/file.js')
const Rewiew = require('./models/rewiew')
const {
	checkDatabaseExists,
	checkSequelizeConnection,
} = require("./database.js");
const FileService = require('./services/file_service')
const file_router = require('./routes/file_router');
const rewiew_router = require('./routes/rewiew_router');

const app = express()
const port = CONFIG.server_port

app.use(express.json())
app.use(file_upload({}))
app.use('/files', file_router)
app.use('/rewiews', rewiew_router)



async function startServer() {
	try {
		await connectToDatabase()
		FileService.checkDirectory()
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