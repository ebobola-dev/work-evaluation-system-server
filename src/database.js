const Sequilize = require('sequelize')
const CONFIG = require('./config')
const {
	Client
} = require('pg')

const sequelize = new Sequilize(
	CONFIG.database_name,
	'postgres',
	CONFIG.database_password, {
		host: CONFIG.database_host,
		dialect: 'postgres',
		operatorsAliases: 0,
		logging: false,
		pool: {
			max: 5,
			min: 0,
			acquire: 3000,
			idle: 10000
		}
	})

const createDatabaseIfNotExists = async function () {
	try {
		const client = new Client({
			host: CONFIG.database_host,
			user: CONFIG.database_user,
			password: CONFIG.database_password,
			port: CONFIG.database_port,
		})
		await client.connect()
		const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${CONFIG.database_name}'`);

		if (res.rowCount === 0) {
			console.log(`База данных не обнаружена, создание...`);
			await client.query(`CREATE DATABASE "${CONFIG.database_name}";`);
			console.log(`База данных создана`);
		} else {
			console.log(`База данных обнаружена`);
		}

	} catch (err) {
		throw `Ошибка при проверке базы данных: ${err}`
	}
};

const checkSequelizeConnection = async function () {
	try {
		await sequelize.authenticate()
		console.log('Подключено к базе данных');
	} catch (err) {
		throw `Ошибка при подлючении к базе данных: ${err}`
	}
}

module.exports = {
	sequelize: sequelize,
	checkDatabaseExists: createDatabaseIfNotExists,
	checkSequelizeConnection: checkSequelizeConnection,

}