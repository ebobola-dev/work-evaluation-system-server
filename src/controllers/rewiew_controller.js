const Rewiew = require('../models/rewiew')
const File = require('../models/file')

class RewiewController {
	async get(req, res) {
		try {
			const filename = req.params["filename"];
			if (filename === null) {
				res.status(400).json({error: 'Имя файла не указано'})
				return
			}
			console.log(`\n[Rewiew/Get] запрос на файл '${filename}'`)
			const file_exists = await File.count({
				where: {
					name: filename
				}
			}) != 0
			if (!file_exists) {
				console.log(`Файл с именем ${filename} не обнаружен`)
				res.status(400).json({error: `Файл с именем ${filename} не обнаружен`})
				return
			}
			const rewiews = await Rewiew.findAll({
				where: {
					filename: filename
				},
				raw: true,
			})
			console.log(`На файл '${filename} обнаружено ${rewiews.length} отзывов`)
			res.json(rewiews)
		} catch (err) {
			console.error(`Непредвиденная ошибка сервера: ${err}\n`)
			res.status(500).json({
				"error": "Непредвиденная ошибка сервера"
			})
		}
	}

	async rate(req, res) {
		try {
			const {
				filename,
				rating,
				comment
			} = req.body
			console.log(`\n[Rate] запрос на файл '${filename}'`)
			console.log(`Оценка: ${rating}`)
			console.log(`Комментарий: ${comment}`)
			const file = await File.findOne({
				where: {
					name: filename
				}
			})
			if (file === null) {
				console.log(`Файл с именем ${filename} не обнаружен`)
				res.status(400).json({error: `Файл с именем ${filename} не обнаружен`})
				return
			}
			const newRewiew = await Rewiew.create({
				filename: filename,
				rating: rating,
				comment: comment,
			})
			console.log(`Отзыв добавлен\n`)
			res.json(newRewiew)
		} catch (err) {
			console.error(`Непредвиденная ошибка сервера: ${err}\n`)
			res.status(500).json({
				"error": "Непредвиденная ошибка сервера"
			})
		}
	}
}

module.exports = new RewiewController();