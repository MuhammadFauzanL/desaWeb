const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('FATAL ERROR: MONGO_URI is not defined in .env file.');
      throw new Error('MONGO_URI is missing');
    }
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    throw err;
  }
};

module.exports = connectDB;





