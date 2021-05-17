if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')

app.set('view engine','ejs') //template engine 
app.set('views',__dirname+'/views') //đường dẫn thư mục view
app.set('layout','layouts/layout')//layout mẫu của header , footer

app.use(expressLayouts)
app.use(express.static('public'))//nơi chứa các file , css
app.use('/',indexRouter)
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser : true
})
const db = mongoose.connection 
db.on('error',error => {
    console.log(error)
})
db.once('open',() => console.log('Connected to Mongoose!'))


app.listen(process.env.PORT || 3000) // thông tin port