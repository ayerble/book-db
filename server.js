const express = require('express');
const path = require('path');

const portNum = parseInt(process.argv.slice(2))
const port = portNum ? portNum : 3000

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/bookDB', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('Mongo connection open.'))
   .catch(err => console.log(`Mongo connection error.\n${err}`))

const Book = require('./models/book')

const methodOverride = require('method-override')

const app = express();
app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
   res.redirect('/index')
})

app.get('/index', async (req, res) => {
   const books = await Book.find({})
   res.render('books/index.ejs', { books })
})

//create
app.get('/index/new', async (req, res) => {
   res.render('books/new.ejs')
})
app.post('/index', async (req, res) => {
   const newBook = new Book(req.body) // i need to go back to this
   await newBook.save();
   res.redirect(`/index/details/${newBook.id}`)
})

//read 
app.get('/index/details/:id', async (req, res) => {
   const { id } = req.params;
   const books = await Book.findById(id)

   res.render('books/details.ejs', { books })
})

//update
app.get('/index/details/:id/edit', async (req, res) => {
   const { id } = req.params;
   const books = await Book.findById(id)
   res.render('books/edit.ejs', { books })
})
app.put('/index/details/:id', async (req, res) => {
   const { id } = req.params;
   const book = await Book.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
   res.redirect(`/index/details/${book._id}`)
})



//delete
app.delete('/index/details/:id', async (req, res) => {
   const { id } = req.params;
   const deletedProduct = await Book.findByIdAndDelete(id)
   res.redirect('/index')
})

app.get('*', (req, res) => {
   res.send('Unknown page');
})

app.listen(port, () => {
   console.log(`App is listening on port ${port}.`);
})
