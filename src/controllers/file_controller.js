const File = require('../models/file')
const FileService = require('../services/file_service')
const fs = require('fs')
const mime = require('mime')
const path = require('path');
class FileController {
	async get(req, res) {
		try {
			const files = await File.findAll({
				raw: true
			})
			res.json({
				"files": files
			})
		} catch (err) {
			console.error(`Непредвиденная ошибка сервера: ${err}`)
			res.status(500).json({
				"error": "Непредвиденная ошибка сервера"
			})
		}
	}

	async upload(req, res) {
		try {
			console.log('\nЗапрос на загрузку файла')
			if (req.files === null) {
				console.log('Файл не указан')
				res.status(400).json({'error': 'Запрос на загрузку файла'})
			}
			const filedata = Object.values(req.files)[0];
			console.log(`${filedata.name} | ${filedata.mimetype}`)
			const fileAlreadyExist = await File.count({
				where: {
					name: filedata.name,
				}
			}) != 0
			if (fileAlreadyExist) {
				console.log(`Файл с именем ${filedata.name} уже существует`)
				res.status(400).json({'error': `Файл с именем ${filedata.name} уже существует`})
				return
			}
			FileService.save(filedata)
			const newFile = await File.create({
				name: filedata.name,
			})
			console.log(`Файл '${filedata.name}' успешно загружен(${filedata.mimetype})`)
			res.json(newFile)
		} catch (err) {
			console.error(`Непредвиденная ошибка сервера: ${err}\n`)
			res.status(500).json({
				"error": "Непредвиденная ошибка сервера"
			})
		}
	}

	async load(req, res) {
		try {
			console.log('\nЗапрос на получение файла')
			const filename = req.query.filename
			console.log(`---> ${filename}`)

			const file = await File.findOne({
				where: {
					name: filename,
				}
			})
			if (file === null) {
				console.log(`Файл с именем ${filename} не найден`)
				res.status(400).json({'error': `Файл с именем ${filename} не найден`})
				return
			}
			if (!FileService.fileIsExist(file.name)) {
				console.log(`Файл с именем ${filename} не найден, запись в базе данных есть)`)
				console.log(`Удаление записи в базе данных`)
				await file.destroy()
				res.status(400).json({'error': `Файл с именем ${filename} повреждён`})
				return
			}
			const filepath = path.join('.\\src\\users_files', file.name)
			console.log(`Файл ${filename} обнаружен (${filepath})`)
			fs.readFile(filepath, (err, file) => {
				if (err) {
					console.error(`Ошибка при чтении файла ${filepath}: ${err}`)
					res.status(500).json({
						"error": "Непредвиденная ошибка сервера"
					})
				}
				console.log('123')
				res.setHeader('Content-Type', mime.getType(file.name))
				res.setHeader('Content-Disposition', 'inline')
				console.log(`Файл ${filename} отправлен\n`)
				res.send(file)
			})
		} catch (err) {
			console.error(`Непредвиденная ошибка сервера: ${err}\n`)
			res.status(500).json({
				"error": "Непредвиденная ошибка сервера"
			})
		}
	}
}

module.exports = new FileController();