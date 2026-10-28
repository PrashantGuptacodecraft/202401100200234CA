const express = require('express');
const {
  addBook,
  getBooks,
  updateAvailability
} = require('../controllers/bookController');

const router = express.Router();

router.post('/', addBook);
router.get('/', getBooks);
router.patch('/:id', updateAvailability);

module.exports = router;
