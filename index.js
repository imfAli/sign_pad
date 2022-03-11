const express = require('express')
const path = require('path')

const app = express()

const publicDir = path.join(__dirname,'./public')
app.use(express.static(publicDir))

const port = process.env.PORT || 3000

app.get('' , (req,res) => {
    res.render('index')
})

app.listen(port , () => {
    console.log(`Server is running on port ${port}....`)
})