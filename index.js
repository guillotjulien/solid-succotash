const { MongoClient } = require('mongodb');
const express = require('express');

let db = null;

const app = express();
const router = express.Router();

app.use('/api', router);

router.get('/symbols', async (req, res) => {
  const symbols = await db.collection('symbols').find().toArray();
  res.json(symbols);
});

router.get('/symbols/change', async (req, res) => {
  // marketChangePercent is computed by comparing current known price (most recent) with previous known price

  // Example output
  // [
  //   {
  //     "symbol": "PFE",
  //     "marketChangePercent": -0.05,
  //   },
  //   {
  //     "symbol": "LLY",
  //     "marketChangePercent": 0.71,
  //   },
  // ];
});

app.listen(3000, async () => {
  const mongoClient = await MongoClient.connect('mongodb://127.0.0.1:57202/finance');
  
  db = mongoClient.db();

  console.log('App listening on http://localhost:3000');
});
