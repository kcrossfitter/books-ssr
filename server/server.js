const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const { Book } = require('./models/Book');
const { Store } = require('./models/Store');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = "mongodb://localhost/book_db";

mongoose.Promise = global.Promise;

try {
  mongoose.connect(MONGO_URI, {
    useMongoClient: true
  });
} catch (error) {
  mongoose.createConnection(MONGO_URI, {
    useMongoClient: true
  });
}

mongoose.connection
  .once('open', () => {
    console.log("MongoDB Running...");
  })
  .on("error", (error) => {
    throw error;
  });

// static assets
app.use(express.static(path.join(__dirname, '/../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/stores", (req, res) => {
  Store.find({}).then((stores) => {
    res.status(200).send(stores);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

app.get("/api/books", (req, res) => {
  let limit = parseInt(req.query.limit) || 10;
  let order = req.query.ord || 'asc';

  Book.find({}).sort({ _id: order }).limit(limit).then((books) => {
    res.status(200).send(books);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

app.get("/api/books/:id", (req, res) => {
  Book.findById(req.params.id).then((book) => {
    res.status(200).send(book);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

app.patch("/api/books/:id", (req, res) => {
  Book.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})  
    .then((book) => {
      res.status(200).send(book);
    }).catch((error) => {
      res.status(400).send(error);
    });
});

app.delete("/api/books/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id).then((book) => {
    res.status(200).send();
  }).catch((error) => {
    res.status(400).send(error);
  });
});

app.post("/api/add_book", (req, res) => {
  let newBook = new Book({
    name: req.body.name,
    author: req.body.author,
    pages: req.body.pages,
    price: req.body.price,
    stores: req.body.stores
  });

  newBook.save().then((book) => {
    res.status(201).send();
  }).catch((error) => {
    res.status(400).send(error);
  });
})

app.post("/api/add_store", (req, res) => {
  let newStore = new Store({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone
  });

  newStore.save().then((store) => {
    res.status(201).send();
  }).catch((error) => {
    res.status(400).send(error);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});