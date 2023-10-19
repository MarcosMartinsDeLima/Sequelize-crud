const {Sequelize} = require('sequelize')
require('dotenv').config()
const dbname = process.env.DB_NAME
const dbuser = process.env.DB_USER
const dbpassword = process.env.DB_PASSWORD

const sequelize = new Sequelize(dbname,dbuser,dbpassword,{
    host:'localhost',
    dialect:'mysql'
})

module.exports = sequelize