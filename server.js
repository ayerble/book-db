const express = require('express');
const path = require('path');

const portNum = parseInt(process.argv.slice(2))
const port = portNum ? portNum : 3000

const mongoose = require('mongoose');
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


app.get('/', (req, res) => {
   res.redirect('/index')
})

app.get('/index', async (req, res) => {
   const books = await Book.find({})
   res.render('books/index.ejs', { books })
})

app.get('/index/:id', async (req, res) => {
   const { id } = req.params;
   const books = await Book.findById(id)

   res.render('books/details.ejs', { books })
})

app.get('*', (req, res) => {
   res.send('Unknown page');
})

app.listen(port, () => {
   console.log(`App is listening on port ${port}.`);
})
