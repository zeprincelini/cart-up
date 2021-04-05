const knex = require('knex');
const environment = 'production';
const config = require('../knexfile.js')[environment];
module.exports = knex(config);