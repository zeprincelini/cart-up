require("dotenv").config()
// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.db,
      user:     process.env.user,
      password: process.env.pass
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },


  production: {
    client: 'postgresql',
    connection: {
      database: process.env.db,
      user:     process.env.user,
      password: process.env.pass
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }

};
