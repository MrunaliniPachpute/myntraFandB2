const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { getStoredItems, storeItems } = require('./data/items');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to myntra items store');
});

app.get('/items', async (req, res) => {
  try {
    const storedItems = await getStoredItems();
    res.json({ items: storedItems });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items.', error: error.message });
  }
});

app.get('/items/:id', async (req, res) => {
  try {
    const storedItems = await getStoredItems();
    const item = storedItems.find((item) => item.id === req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }
    res.json({ item });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch item.', error: error.message });
  }
});

app.post('/items', async (req, res) => {
  try {
    const existingItems = await getStoredItems();
    const itemData = req.body;
    const newItem = {
      ...itemData,
      id: uuidv4(),
    };
    const updatedItems = [newItem, ...existingItems];
    await storeItems(updatedItems);
    res.status(201).json({ message: 'Stored new item.', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to store item.', error: error.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started at port: ${port}`));
