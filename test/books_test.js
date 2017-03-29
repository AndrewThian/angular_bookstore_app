/* globals describe it */

const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const Book = require('../models/book')

let book = {
  _id: '58da30f00f225a8577b5ea76',
  title: 'The Murder House',
  genre: 'Suspense',
  description: 'No. 7 Ocean Drive is a gorgeous, multi-million-dollar beachfront estate in the Hamptons, where money and privilege know no bounds. But its beautiful gothic exterior hides a horrific past: it was the scene of a series of depraved killings that have never been…',
  author: 'James Patterson',
  publisher: 'Little, Brown and Company',
  pages: '480',
  image_url: 'http://prodimage.images-bn.com/pimages/9781455589906_p0_v1_s192x300.jpg',
  buy_url: 'http://www.barnesandnoble.com/w/the-murder-house-james-patterson/1120873479?ean=9781455589906&quickview=true'
}

// let book
//
// function dataSetup (done) {
//   Book.create({
//     title: 'Test book',
//     genre: 'Test book genre',
//     description: 'Test book description',
//     author: 'Test book author',
//     publisher: 'Test book publisher',
//     pages: 'Test book pages',
//     image_url: 'Test book url',
//     buy_url: 'Test book url2'
//   }, function () {
//     Book.find({title: 'Test book'}, function (err, book) {
//       if (err) return err
//       book = book[0]
//     })
//   })
// }

describe('GET /api/books', function () {
  it('should return a 200 response', function (done) {
    api.get('/')
    .expect(200, done)
  })

  it('should return an array of books', function (done) {
    api.get('/api/books')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function (err, res) {
      if (err) throw err
      expect(res.body).to.be.an('array')
      done()
    })
  })

  it('should be an object with keys and values', function (done) {
    api.get('/api/books')
    .set('Accept', 'applications/json')
    .end(function (err, res) {
      if (err) throw err
      expect(res.body[0].title).to.equal(book.title)
      expect(res.body[0].description).to.equal(book.description)
      expect(res.body[0].author).to.equal(book.author)
      expect(res.body[0].publisher).to.equal(book.publisher)
      expect(res.body[0].pages).to.equal(book.pages)
      expect(res.body[0].image_url).to.equal(book.image_url)
      expect(res.body[0].buy_url).to.equal(book.buy_url)
      done()
    })
  })
})

describe('GET /api/books/:id', function () {
  it('should return a 200 response', function (done) {
    api.get('/api/books/' + book._id)
    .expect(200, done)
  })

  it('should return the title, description, etc..', function (done) {
    api.get('/api/books/' + book._id)
    .set('Accept', 'application/json')
    .end(function (err, res) {
      if (err) return err
      expect(res.body.title).to.equal(book.title)
      expect(res.body.description).to.equal(book.description)
      expect(res.body.author).to.equal(book.author)
      expect(res.body.publisher).to.equal(book.publisher)
      expect(res.body.pages).to.equal(book.pages)
      expect(res.body.image_url).to.equal(book.image_url)
      expect(res.body.buy_url).to.equal(book.buy_url)
      done()
    })
  })
})

// describe('POST /api/books/:id', function (done) {
//   it('should return 200 response', function () {
//     api.post('/api/books')
//     .set('Accept', 'application/json')
//     .send(testBook1)
//     .expect(200, done)
//   })
//
//   it('should return 422 response if the field title is wrong', function () {
//     api.post('/api/books')
//     .set('Accept', 'application/json')
//     .send({ti: 'wrong'}) // intentionally sending wrong title!
//     .expect(422, done)
//   })
//
//   it('should add new book into the database', function (done) {
//     api.post('/api/books')
//     .set('Accept', 'application/json')
//     .send(testBook2)
//     .end(function (err, res) {
//       expect(res.body.name).to.equal(testBook2.name)
//       done()
//     })
//   })
// })

// describe('PUT /api/books/:id', function () {
//   it('should return a 200 response', function (done) {
//
//   })
// })
