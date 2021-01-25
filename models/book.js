const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
   name: { type: String, required: true },
   author: { type: String, required: true },
   publisher: { type: String, required: true },
   year: { type: Number, required: true },
   category: { type: String, required: false },
   keywords: { type: [String], required: false },
   lcClass: { type: String, required: true },
   description: { type: String, required: false }
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book