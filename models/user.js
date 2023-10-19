const { DataTypes } = require('sequelize')
const db = require('../db/conne')

const user = db.define('user',{
    name:{
        type: DataTypes.STRING,
        allowNull : false
    } ,
    occupation:{
        type: DataTypes.STRING,
        required: true
    },
    newsLetter:{
        type:DataTypes.BOOLEAN
    }
})

module.exports = user