const express = require('express');
const connect = require('../db');
const router = express.Router();
const { getItems, createItem } = require('../controllers/itemsController');

router.get('/', getItems);
router.post('/items', createItem);

router.get('/items/all', async (req, res) => {
  try {
    const db = await connect();
    const items = await db.collection('items').find().toArray();
    res.json(items);

  } catch (error) {
    res.status(500).json({ error: 'Error fetching items' });
  }
});

module.exports = router;

