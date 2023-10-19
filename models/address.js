const {DataTypes} = require("sequelize")
const db = require('../db/conne')
const User =  require('./user')

const address  = db.define('address',{
    street:{
        type: DataTypes.STRING,
        required:true
    },
    number:{
        type: DataTypes.STRING,
        required:true
    },
    city:{
        type: DataTypes.STRING,
        required:true
    }
})

User.hasMany(address)
address.belongsTo(User)

module.exports= address