const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.json())

// connecting to mongoose
mongoose.connect('mongodb://localhost/bookstore')
const db = mongoose.connection

const Genre = require('./models/genre.js')
const Book = require('./models/book.js')

// home page
app.get('/', function (req, res) {
  res.send('Please use /api/books or /api/genres')
})

// GET genres
app.get('/api/genres', function (req, res) {
  Genre.getGenres(function (err, genres) {
    if (err) {
      throw err
    }
    res.json(genres)
  })
})

// POST genre
app.post('/api/genres', function (req, res) {
  var genre = req.body
  Genre.addGenre(genre, function (err, genre) {
    if (err) {
      throw err
    }
    res.json(genre)
  })
})

app.put('/api/genres/:_id', function (req, res) {
  var id = req.params._id
  var genre = req.body
  // Object literal is there because we stated an parameter for options in our updateGenre method
  Genre.updateGenre(id, genre, {}, function (err, genre) {
    if (err) {
      throw err
    }
    res.json(genre)
  })
})

// DELETE genre
app.delete('/api/genres/:_id', function (req, res) {
  var id = req.params._id
  // Object literal is there because we stated an parameter for options in our updateGenre method
  Genre.destroyGenre(id, function (err, genre) {
    if (err) {
      throw err
    }
    res.json(genre)
  })
})

app.get('/api/books', function (req, res) {
  Book.getBooks(function (err, books) {
    if (err) {
      throw err
    }
    res.json(books)
  })
})

app.get('/api/books/:_id', function (req, res) {
  Book.getBookById(req.params._id, function (err, book) {
    if (err) {
      throw err
    }
    res.json(book)
  })
})

// POST books
app.post('/api/books', function (req, res) {
  var book = req.body
  Book.addBook(book, function (err, book) {
    if (err) {
      throw err
    }
    res.json(book)
  })
})

app.put('/api/books/:_id', function (req, res) {
  var id = req.params._id
  var genre = req.body
  // Object literal is there because we stated an parameter for options in our updateGenre method
  Book.updateBook(id, genre, {}, function (err, book) {
    if (err) {
      throw err
    }
    res.json(book)
  })
})

// DELETE book
app.delete('/api/books/:_id', function (req, res) {
  var id = req.params._id
  // Object literal is there because we stated an parameter for options in our updateGenre method
  Book.destroyBook(id, function (err, book) {
    if (err) {
      throw err
    }
    res.json(book)
  })
})

app.listen(3000)
console.log('Port 3000 running...')
