const mongoose = require('mongoose')
var Schema = mongoose.Schema

var BookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: [String], required: true},
    yearPublished: {type: String, required: true},
    price: {type: Number, required: true}

})

var Book = mongoose.model('Book', BookSchema)
module.exports = Book;