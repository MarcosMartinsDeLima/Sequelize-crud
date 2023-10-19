const express = require('express')
const sequelize = require('./db/conne')
const handlebars = require('handlebars')
const hbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')



const user = require('./models/user')
const address= require('./models/address')

const app = express()

app.engine('handlebars',hbs.engine({handlebars:allowInsecurePrototypeAccess(handlebars)}))
app.set('view engine','handlebars')

app.use(express.urlencoded(
    {
        extended: true
    }
))
app.use(express.static('views'))
app.use(express.json())

app.get('/users/add',(req,resp)=>{
    resp.render('adduser')
})

app.post('/users/create',async(req,resp)=>{
    const name = req.body.name
    const occupation = req.body.occupation
    let newsLetter = req.body.newsLetter

    if(newsLetter === 'on'){
        newsLetter = true
    }
    else{newsLetter = false}
    await user.create({name,occupation,newsLetter})
    resp.redirect('/')


})

app.get('/users/:id',async(req,resp)=>{
    const id = req.params.id
    const User = await user.findOne({include:address,where:{id:id}})
    const Address = await address.findOne({include:user,where:{id:id}})

    resp.render('userview',{User,Address})
})

app.post('/users/delete/:id',async(req,resp)=>{
    const id = req.params.id

    await user.destroy({where:{id:id}})
    resp.redirect('/')
})

app.get('/users/edit/:id',async(req,resp)=>{
    const id = req.params.id
    const User = await user.findOne({raw:true,where:{id:id}})
    const Address= await address.findAll({include:user})
    resp.render('useredit',{User,Address})

    
})

app.post('/users/update',async(req,resp)=>{
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsLetter =req.body.newsLetter

    if(newsLetter === 'on'){
        newsLetter = true        
    }
    else{
        newsLetter = false
    }

    const UpdatedUser ={
        id,
        name,
        occupation,
        newsLetter
    }

    await user.update(UpdatedUser,{where:{id:id}})
    resp.redirect('/')
})

app.post('/users/address',async(req,resp)=>{
    const UseriD = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const Address = {
        UseriD,
        street,
        number,
        city
    }

    await address.create(Address)
    resp.redirect('/')
})

app.post('/address/delete',(req,resp)=>{
    const id = req.body.id

    address.destroy({
        where:{id:id}
    })

    resp.redirect(`/users/edit/:${id}`)
})

app.get('/',async (req,resp)=>{
    const users = await user.findAll({raw:true})
    resp.render('home',{users:users})
})

sequelize.sync().then(()=>{
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})