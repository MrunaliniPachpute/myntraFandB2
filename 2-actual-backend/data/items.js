const fs = require('node:fs/promises');

async function getStoredItems() {
  try {
    const rawFileContent = await fs.readFile('items.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    return data.items ?? [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []; 
    }
    throw new Error('Failed to read items.json: ' + error.message);
  }
}

async function storeItems(items) {
  if (!Array.isArray(items)) {
    throw new Error('Invalid items: Expected an array');
  }
  try {
    await fs.writeFile('items.json', JSON.stringify({ items }, null, 2));
  } catch (error) {
    throw new Error('Failed to write to items.json: ' + error.message);
  }
}

exports.getStoredItems = getStoredItems;
exports.storeItems = storeItems;
