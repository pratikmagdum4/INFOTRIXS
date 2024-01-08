const express = require('express');
const path = require('path'); 
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '')));


let quotes = [
  { author: "Franklin D. Roosevelt", text: "The only limit to our realization of tomorrow will be our doubts of today." },
  { author: "Eleanor Roosevelt", text: "The future belongs to those who believe in the beauty of their dreams." },
  { author: "Sam Levenson", text: "Don't watch the clock; do what it does. Keep going." },
  {
    "author": "Albert Einstein",
    "text": "Life is like riding a bicycle. To keep your balance, you must keep moving."
  },
  {
    "author": "Maya Angelou",
    "text": "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel."
  },
  {
    "author": "Mark Twain",
    "text": "The secret of getting ahead is getting started."
  },
  {
    "author": "Oscar Wilde",
    "text": "Be yourself; everyone else is already taken."
  },
  {
    "author": "Eleanor Roosevelt",
    "text": "Do one thing every day that scares you."
  },
  {
    "author": "Steve Jobs",
    "text": "Your time is limited, don't waste it living someone else's life."
  },
  {
    "author": "Dr. Seuss",
    "text": "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose."
  },
  {
    "author": "Ralph Waldo Emerson",
    "text": "Do not go where the path may lead, go instead where there is no path and leave a trail."
  },
  {
    "author": "Coco Chanel",
    "text": "The most courageous act is still to think for yourself. Aloud."
  },
  {
    "author": "Vincent van Gogh",
    "text": "I would rather die of passion than of boredom."
  }
];


app.get('/quote-of-the-day', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  res.json(quote);
});


app.get('/quotes', (req, res) => {
  res.json(quotes);
});

// Route to add a new quote
app.post('/quotes', (req, res) => {
  const newQuote = req.body;
  quotes.push(newQuote);
  res.json(newQuote);
});


app.put('/quotes/:author', (req, res) => {
  const author = req.params.author;
  const updatedQuote = req.body;

  const index = quotes.findIndex(q => q.author === author);

  if (index !== -1) {
    quotes[index] = { ...quotes[index], ...updatedQuote };
    res.json(quotes[index]);
  } else {
    res.status(404).json({ error: "Quote not found" });
  }
});


app.delete('/quotes/:author', (req, res) => {
  const author = req.params.author;
  const index = quotes.findIndex(q => q.author === author);

  if (index !== -1) {
    const deletedQuote = quotes.splice(index, 1)[0];
    res.json(deletedQuote);
  } else {
    res.status(404).json({ error: "Quote not found" });
  }
});


app.get('/quotes/search', (req, res) => {
  const author = req.query.author;

  if (!author) {
    res.status(400).json({ error: "Author parameter is required for search" });
  } else {
    const matchingQuotes = quotes.filter(q => q.author.toLowerCase().includes(author.toLowerCase()));
    res.json(matchingQuotes);
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
