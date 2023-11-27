const fs = require('fs')
const path = require('path');

class FileService {
	static files_directory = '../users_files'
	static dirPath = path.join(__dirname, FileService.files_directory);

	async save(file) {

	}

	async checkDirectory() {
		if (!fs.existsSync(FileService.dirPath)) {
			console.log(`Создание папки '${FileService.dirPath}'`)
			fs.mkdirSync(FileService.dirPath);
			return
		}
		console.log(`Папка '${FileService.dirPath}' обнаружена`)
	}
}

module.exports = new FileService();