const mongoose = require('mongoose');
const DB = process.env.DB || "localhost";

const connection = `mongodb://${DB}:27017/books-broken`;
const connectDb = () => {
    return mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true });
   };

module.exports = connectDb;