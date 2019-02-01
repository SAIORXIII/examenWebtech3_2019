const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db;

MongoClient.connect('mongodb://localhost:27017/examen', { useNewUrlParser: true },
 (err, database) => {
    if (err) return console.log(err)
    db = database.db('examen')
    app.listen(process.env.PORT || 4000, () => {
      console.log('Listening on port 4000')
    })
})

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))


// Redirect to list
app.get('/', (req, res) => {
   res.redirect('/list')
})

// list all products
app.get('/list', (req, res) => {
  db.collection('recipes').find().toArray((err, result) => {
    if (err) throw err
    res.render('list.ejs',{ recipes: result })
  })
})


// Show the add product form
app.get('/add', (req, res) => {
   res.render('add.ejs', {})
})

// Add a product to the db
app.post('/add', (req, res) => {
  db.collection('recipes').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
     res.redirect('/list')
  })
})
