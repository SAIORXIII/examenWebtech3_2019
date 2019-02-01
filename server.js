const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient


MongoClient.connect('mongodb://localhost:27017/examen', { useNewUrlParser: true },
 (err, database) => {
    if (err) return console.log(err)
    db = database.db('examen')
    app.listen(process.env.PORT || 4000, () => {
      console.log('Listening on port 4000')
    })
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
