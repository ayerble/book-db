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
   },
   {
      name: `A Theory of Justice`,
      author: "John Rawls",
      year: 1971,
      publisher: "Cambridge, MA: Belknap Press of Harvard University Press",
      category: "Justice",
      lcClass: "JC578.R38",
      keywords: ["justice", "law", "philosophy"],
      description: `"Each person" writes John Rawls, "possesses an inviolability founded on justice that even the welfare of society as a whole cannot override. Therefore in a just society the rights secured by justice are not subject to political bargaining or to the calculus of social interests".
      In this book Mr. Rawls attempts to account for these propositions, which he believes express our intuitive convictions of the primacy of justice. The principles of justice he sets forth are those that free and rational persons would accept in an initial position of equality. In this hypothetical situation, which corresponds to the state of nature in social contract theory, no one knows his or her place in society; his or her class position or social status; his or her fortune in the distribution of natural assets and abilities; his or her intelligence, strength, and the like; or even his or her conception of the good. Thus, deliberating behind a veil of ignorance, people determine their rights and duties. The first, theoretical, section of the book addresses objections to the theory and alternative positions, especially utilitarianism.`
   },
   {
      name: `Everything in its Right Place: Analyzing Radiohead`,
      author: "Brad Osborn",
      year: 2017,
      publisher: "New York: Oxford University Press",
      category: "Music theory and analysis",
      lcClass: "ML421.R25 O83 2017",
      keywords: ["music", "analysis", "popular music"],
      description: `Analyzing Radiohead advances the claim that, more than any rock artist since The Beatles, Radiohead’s music between 1997 and 2011 inhabits the sweet spot between two extremes: on the one hand, music that is wholly conventional and conforms to all of our expectations about rock music, and, on the other hand, music so aggressively experimental that it thwarts any learned expectations. In terms of musical perception, the former extreme arouses little need for interpretation, while the latter frustrates any search for meaning based on expectation-realization chains. Radiohead’s music contains many surprises, yet remains accessible within a framework of expectations inherited from rock and other musical traditions. This listening experience, in which expectations are constantly set up and yet frequently subverted, produces a rich environment for interpreting musical meaning. Tools adapted from recent research in music theory illuminate these expectations and surprises in four musical parameters: form, rhythm and meter, timbre, and harmony. In the process of analyzing these musical elements in Radiohead’s songs, the book consistently addresses potential meanings by linking elements of musical structure to song lyrics. Relating these structures and lyrics to similar popular music, classical music, music videos, literature, and films illuminates even more potential intertextual meanings.`
   },
]

Product.insertMany(seedBooks)
   .then(res => console.log(res))
   .catch(error => console.log(error))

