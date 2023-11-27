const File = require('../models/file')

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
			res.status(501).send("Not implemented")
		} catch (err) {
			console.error(`Непредвиденная ошибка сервера: ${err}`)
			res.status(500).json({
				"error": "Непредвиденная ошибка сервера"
			})
		}
	}
}

module.exports = new FileController();