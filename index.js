const express = require('express');
const path = require('path'); 
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Allow requests from your deployed domain
const corsOptions = {
  origin: 'https://wisdomwaves.onrender.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '')));

let quotes = [
  // Your existing quotes array...
];

app.get('/quote-of-the-day', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  res.json(quote);
});

app.get('/quotes', (req, res) => {
  res.json(quotes);
});

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
