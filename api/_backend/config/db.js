const mongoose = require('mongoose');

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing');
    }
    const opts = {
      bufferCommands: false, // Penting di serverless agar tidak hang/stuck
      serverSelectionTimeoutMS: 5000, // Timeout dalam 5 detik, jangan berdiam selamanya
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
      console.log('MongoDB Connected (Serverless Mode)...');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; // reset jika gagal
    console.error('MongoDB Connection Error:', err.message);
    throw err;
  }

  return cached.conn;
};

module.exports = connectDB;
