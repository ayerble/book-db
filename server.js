const express = require('express');
const path = require('path');

const portNum = parseInt(process.argv.slice(2))
const port = portNum ? portNum : 3000
const AppError = require('./AppError');
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
// app.use((req, res, next) => {
//    req.requestTime = Date.now();
//    console.log(req.method, req.path);
//    next();
// })


function wrapAsync(fn) {
   return function (req, res, next) {
      fn(req, res, next).catch(e => next(e))
   }
}

app.get('/', (req, res) => {
   res.redirect('/index')
})

app.get('/index', wrapAsync(async (req, res, next) => {
   const books = await Book.find({})
   res.render('books/index.ejs', { books })
}))

//create
app.get('/index/new', (req, res) => {
   res.render('books/new.ejs')
})
app.post('/index', wrapAsync(async (req, res) => {
   const newBook = new Book(req.body) // i need to go back to this
   await newBook.save();
   res.redirect(`/index/details/${newBook.id}`)
}))

//read 
app.get('/index/details/:id', wrapAsync(async (req, res, next) => {
   const { id } = req.params;
   const books = await Book.findById(id)

   if (!books) {
      throw new AppError('Book Not Found', 404);
   }
   res.render('books/details.ejs', { books })
}))

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


const handleValidationErr = err => {
   console.dir(err);
   //In a real app, we would do a lot more here...
   return new AppError(`Validation Failed...${err.message}`, 400)
}

app.use((err, req, res, next) => {
   console.log(err.name);
   //We can single out particular types of Mongoose Errors:
   if (err.name === 'ValidationError') err = handleValidationErr(err)
   next(err);
})

app.use((err, req, res, next) => {
   const { status = 500, message = 'Something went wrong' } = err;
   res.status(status).send(message);
})



app.listen(port, () => {
   console.log(`App is listening on port ${port}.`);
})
