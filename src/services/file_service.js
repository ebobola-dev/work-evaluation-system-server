const fs = require('fs')
const path = require('path');

class FileService {
	static files_directory = '../users_files'
	static dirPath = path.join(__dirname, FileService.files_directory);

	async save(filedata) {
		await filedata.mv(path.join(FileService.dirPath, filedata.name))
	}

	async checkDirectory() {
		if (!fs.existsSync(FileService.dirPath)) {
			console.log(`Создание папки '${FileService.dirPath}'`)
			fs.mkdirSync(FileService.dirPath);
			return
		}
		console.log(`Папка '${FileService.dirPath}' обнаружена`)
	}

	fileIsExist(filename) {
		return fs.existsSync(path.join(FileService.dirPath, filename))
	}
}

module.exports = new FileService();