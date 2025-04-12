const fs = require('fs');
const path = require('path');

const BOOKS_FILE = path.join(__dirname, '../data/books.json');

const readBooks = () => {
  const data = fs.readFileSync(BOOKS_FILE);
  return JSON.parse(data);
};

const writeBooks = (books) => {
  fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2));
};

module.exports = { readBooks, writeBooks };
