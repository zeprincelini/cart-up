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
    connection: 'postgres://ckxgwwbquijjvj:9c2597f16a79758aa878f17e5be781eb741ca7c4379b161a725fa97e1138a6b8@ec2-52-44-31-100.compute-1.amazonaws.com:5432/dcvdeb6tttptlt',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }

};
