const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });
const db = client.db('simon');
const userCollection = db.collection('user');
// const scoreCollection = db.collection('score');

// This will test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
    score: 0 // NEW
  };
  await userCollection.insertOne(user);
  return user;
}

// async function addScore(score) {
//   return scoreCollection.insertOne(score);
// }

async function updateUserScore(email, score) {
  return userCollection.updateOne(
    { email: email },
    { $set: { score: score } }
  );
}

async function getUserScore(email) {
  const user = await userCollection.findOne({ email: email });
  return user ? user.score || 0 : 0;
}

function getHighScores() {
  const query = { score: { $gt: 0, $lt: 900 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  // addScore,  // removed function
  getHighScores,
  updateUserScore,
  getUserScore,
};
