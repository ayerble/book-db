const mongoose = require('mongoose');
const { insertMany } = require('./models/book.js');
const Product = require('./models/book');

mongoose.connect('mongodb://localhost:27017/bookDB', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('Mongo connection open.'))
   .catch(err => console.log(`Mongo connection error.\n${err}`))


const seedBooks = [
   {
      name: "Manufacturing Consent: The Political Economy of the Mass Media",
      author: "Edward S. Herman and Noam Chomsky",
      year: 1988,
      publisher: "Pantheon Books",
      category: "Media of the United States",
      lcClass: "P96.E25 H47 2002",
      keywords: ["media", "politics", "propaganda"],
      description: "Contrary to the usual image of the press as cantankerous, obstinate, and ubiquitous in its search for truth, Edward Herman and Noam Chomsky depict how an underlying elite consensus largely structures all facets of the news. They skilfully dissect the way in which the marketplace and the economics of publishing significantly shape the news. They reveal how issues are framed and topics chosen, and contrast the double standards underlying accounts of free elections, a free press, and governmental repression between Nicaragua and El Salvador; between the Russian invasion of Afghanistan and the American invasion of Vietnam; between the genocide in Cambodia under a pro-American government and genocide under Pol Pot. What emerges from this groundbreaking work is an account of just how propagandistic our mass media are, and how we can learn to read them and see their function in a radically new way."
   },
   {
      name: `L'Être et le néant : Essai d'ontologie phénoménologique`,
      author: "Jean-Paul Sartre",
      year: 1943,
      publisher: "Éditions Gallimard, Philosophical Library",
      category: "Philosophy",
      lcClass: "B819.S27",
      keywords: ["philosophy", "ontology"],
      description: `L’Etre et le Néant, publié en 1943, cherche à répondre à la question « qu’est-ce que l’être ? ». Cela amène Sartre à s’intéresser à la conscience, au néant, à autrui, mais aussi à des comportements comme la mauvaise foi ou la honte. Sartre utilise pour ce faire une approche phénoménologique qui se nourrit de ses lectures de Heidegger.`
   }
]

Product.insertMany(seedBooks)
   .then(res => console.log(res))
   .catch(error => console.log(error))

