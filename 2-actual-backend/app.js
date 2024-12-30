require('dotenv').config();
const express = require('express');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get, child } = require('firebase/database');
const bodyParser = require('body-parser');

// Firebase configuration (your config)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getDatabase(appFirebase);

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// POST route to store data in Firebase Realtime Database
app.post('/store-data', async (req, res) => {
  const { key, data } = req.body;

  if (!key || !data) {
    return res.status(400).json({ message: 'Key and data are required.' });
  }

  try {
    await set(ref(db, key), data);
    res.status(200).json({ message: 'Data stored successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route to fetch data from Firebase Realtime Database
app.get('/get-data/:key', async (req, res) => {
  const key = req.params.key;

  try {
    const snapshot = await get(child(ref(db), key));
    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: 'Data not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
