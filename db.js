require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

async function connectToDatabase() {
  if (db) return db;

  try {
    await client.connect();
    db = client.db('api-rest');
    console.log('Connected to MongoDB');
    const collection = db.collection('items');
    console.log('📦 Using collection:', collection.collectionName);
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports = connectToDatabase;
