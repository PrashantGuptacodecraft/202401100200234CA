const mongoose = require('mongoose');
const Book = require('../models/Book');

async function addBook(req, res) {
  const { title, author, category } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const book = await Book.create({ title, author, category });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getBooks(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (page < 1 || limit < 1) {
    return res.status(400).json({ message: 'Page and limit must be positive numbers' });
  }

  try {
    const books = await Book.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Book.countDocuments();

    res.json({ books, page, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateAvailability(req, res) {
  const { available } = req.body;

  if (typeof available !== 'boolean') {
    return res.status(400).json({ message: 'Available must be true or false' });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid book ID' });
  }

  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { available },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addBook, getBooks, updateAvailability };
