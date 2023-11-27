const {
	DataTypes
} = require("sequelize");
const {
	sequelize
} = require("../database.js");

const File = sequelize.define("files", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
	},
});

module.exports = File;