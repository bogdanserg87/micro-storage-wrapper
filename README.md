# Micro Storage Wrapper

A lightweight wrapper for browser storage APIs, abstracting localStorage, sessionStorage, and IndexedDB.

## Features

- Uniform API across localStorage, sessionStorage, and IndexedDB.
- Easy-to-use asynchronous API for all storage methods.
- Includes metadata like timestamps for each stored item.

## Installation

```sh
npm install micro-storage-wrapper
```

## Usage

```js
import storage from 'micro-storage-wrapper';

// Set item
await storage.setItem('key', { foo: 'bar' });

// Get item
const item = await storage.getItem('key');
console.log(item);

// Remove item
await storage.removeItem('key');

// Clear storage
await storage.clear();
```

## Dependencies

- `idb`: For IndexedDB support.
- `localforage`: For a consistent API across different storage types.
- `lodash.isempty`: To check for empty values.
- `uuid`: For generating unique IDs for each stored item.
- `moment`: For timestamping stored items.
