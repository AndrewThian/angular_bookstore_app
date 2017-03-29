const mongoose = require('mongoose')

// Genre schema
const GenreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})

const Genre = module.exports = mongoose.model('Genre', GenreSchema)

// GET genre
module.exports.getGenres = function (callback, limit) {
  Genre.find(callback).limit(limit)
}

// POST genre
module.exports.addGenre = function (genre, callback) {
  Genre.create(genre, callback)
}

// PUT genre
module.exports.updateGenre = function (id, genre, options, callback) {
  var query = {_id: id}
  var update = {
    name: genre.name
  }
  Genre.findOneAndUpdate(query, update, options, callback)
}

// DELETE genre
module.exports.destroyGenre = function (id, callback) {
  var query = {_id: id}
  Genre.remove(query, callback)
}
