const fs = require('fs');
const path = require('path');

// Temporary directory in Vercel (use only during function execution)
const itemsFilePath = path.join('/tmp', 'items.json');

// Function to get stored items from the temporary JSON file
const getStoredItems = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(itemsFilePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data ? JSON.parse(data) : []);
      }
    });
  });
};

// Function to store items in the temporary JSON file
const storeItems = (items) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(itemsFilePath, JSON.stringify(items, null, 2), 'utf-8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = { getStoredItems, storeItems };
