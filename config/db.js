const mongoose = require('mongoose');

function connectDB() {
  const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/collegeLibrary';
  return mongoose.connect(mongoURL);
}

module.exports = connectDB;

