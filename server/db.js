const { MongoClient } = require('mongodb');

// IMPORTANT: Replace <db_password> with your true database password!
const MONGO_URI = 'mongodb+srv://krishnagaur2204_db_user:%40Kg8800772061@cluster0.hvc8ewn.mongodb.net/?appName=Cluster0';
const DB_NAME = 'ai_roadmappify';

let client;
let db;

async function connectDb() {
  if (db) return db;

  client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db(DB_NAME);

  const users = db.collection('users');
  await users.createIndex({ email: 1 }, { unique: true });

  return db;
}

async function getUsersCollection() {
  const database = await connectDb();
  return database.collection('users');
}

module.exports = { getUsersCollection };
