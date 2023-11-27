const {
	DataTypes
} = require("sequelize");
const {
	sequelize
} = require("../database.js");

const Rewiew = sequelize.define("rewiews", {
	filename: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	comment: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});

module.exports = Rewiew;