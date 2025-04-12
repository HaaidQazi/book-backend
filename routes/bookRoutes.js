const express = require('express');
const router = express.Router();
const { readBooks, writeBooks } = require('../utils/bookHandler');
const { readUsers } = require('../utils/dataHandler');

// ➕ Add a new book
router.post('/', (req, res) => {
  const { title, author, genre, location, contact, ownerId } = req.body;

  if (!title || !author || !location || !contact || !ownerId) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  const users = readUsers();
  const owner = users.find(u => u.id === Number(ownerId));

  if (!owner || owner.role !== 'Owner') {
    return res.status(403).json({ message: 'Only Book Owners can add listings' });
  }

  const books = readBooks();
  const newBook = {
    id: Date.now(),
    title,
    author,
    genre,
    location,
    contact,
    ownerId: Number(ownerId),
    status: 'available',
    createdAt: new Date().toISOString()
  };

  books.push(newBook);
  writeBooks(books);

  res.status(201).json({ message: 'Book added', book: newBook });
});

// 📚 Get books with filters
router.get('/', (req, res) => {
  const books = readBooks();
  const { genre, location, title } = req.query;

  let filtered = books;

  if (genre) {
    filtered = filtered.filter(book =>
      book.genre?.toLowerCase() === genre.toLowerCase()
    );
  }

  if (title) {
    filtered = filtered.filter(book =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (location) {
    filtered = filtered.filter(book =>
      book.location?.toLowerCase() === location.toLowerCase()
    );
  }

  res.json(filtered);
});

// 🔄 Update book status
router.put('/:id/status', (req, res) => {
  const { status } = req.body;
  const validStatuses = ['available', 'rented', 'exchanged'];
  const books = readBooks();
  const bookId = parseInt(req.params.id);

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const index = books.findIndex(book => book.id === bookId);
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books[index].status = status;
  writeBooks(books);

  res.status(200).json({ message: 'Book status updated', book: books[index] });
});

// ❌ Delete a book
router.delete('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { ownerId } = req.body;

  if (!ownerId) {
    return res.status(400).json({ message: 'Owner ID is required' });
  }

  const books = readBooks();
  const index = books.findIndex(book => book.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (books[index].ownerId !== Number(ownerId)) {
    return res.status(403).json({ message: 'You are not authorized to delete this book' });
  }

  const deletedBook = books.splice(index, 1)[0];
  writeBooks(books);

  res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
});

module.exports = router;
