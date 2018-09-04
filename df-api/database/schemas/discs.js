'use strict';

let connection = require('../connection')
const Sequelize = require('sequelize')

const discs = connection.define('discs', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement:true
	},
	hole: {
		type: Sequelize.INTEGER,
	},
	brand: {
		type: Sequelize.STRING,
	},
	disctype: {
		type: Sequelize.STRING,
	},
	status: {
		type: Sequelize.STRING,
	},
	course: {
		type: Sequelize.STRING,
	},
	latitude: {
		type: Sequelize.FLOAT,
	},
	longitude: {
		type: Sequelize.FLOAT,
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
});

module.exports = discs;
