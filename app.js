// NPM requires
const pretty = require('pretty-date-js')
const moment = require('moment')
const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const mongojs = require('mongojs')
const ObjectId = mongojs.ObjectId

// Setting up local db
const db = mongojs('ReignDesign', ['news'])
const app = express()
// Setting up port
const port = process.env.PORT || 3001

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// GET ROUTE
app.get('/', function(req, res) {
  db.news.find({}, function(err, allNews) {
    res.render('index', { news: allNews, moment: moment })
  })
})

// FIRST INSERTION TO MONGODB
app.get('/firstInsert', (req, res) => {
  request(
    {
      url: 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
      json: true
    },
    (error, response, body) => {
      res.json(body)
      db.news.createIndex({ objectID: 1 }, { unique: true }) // To avoid saving news that already exists in our collection.
      db.news.insert(body.hits, function(err, doc) {
        if (err) console.log(err)
      })
    }
  )
})

// DELETION ROUTE USED BY THE TRASH ICON!
app.get('/delete/:_id', (req, res) => {
  // db.news.remove(req.params._id, function(err) {
  db.news.remove({ _id: ObjectId(req.params._id) }, function(err, docs) {
    if (!err) {
      res.redirect('/')
    }
  })
})

// Connecting the API once an hour to insert new records into mongodb (news)

var requestAPI = setInterval(function() {
  request(
    {
      url: 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // res.json(body);
        db.news.insert(body.hits, function(err, doc) {
          if (err) {
            console.log(
              'The API might have tried to send duplicated news or another error ocurred when getting data from it.'
            )
          }
        })
        console.log('News were saved')
      } else {
        console.log('error' + response.statusCode)
      }
    }
  )
}, 360000)

app.listen(port, () => {
  console.log('Running at localhost')
})
