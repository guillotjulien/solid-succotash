const prompt = require('prompt-sync')();
const { MongoMemoryServer } = require('mongodb-memory-server-global');
const { MongoClient } = require('mongodb');

const fs = require('fs');
const { exit } = require('process');

const data = JSON.parse(fs.readFileSync('data.json'));

(async () => {
  const mongod = new MongoMemoryServer({
    instance: { port: 57202 },
  });

  await mongod.start(true);

  const uri = mongod.getUri('finance');
  const mongoClient = await MongoClient.connect(uri);
  const db = mongoClient.db();

  await db.collection('symbols').insertMany(data);

  prompt('Database running on ' + uri + ' (enter key to end)');

  exit(1);
})();