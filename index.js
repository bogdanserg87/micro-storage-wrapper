import { isEmpty } from 'lodash.isempty';
import { v4 as uuidv4 } from 'uuid';
import localforage from 'localforage';
import moment from 'moment';
import { openDB } from 'idb';

class MicroStorageWrapper {
  constructor() {
    this.initIDB();
  }

  async initIDB() {
    this.db = await openDB('MicroStorageDB', 1, {
      upgrade(db) {
        db.createObjectStore('keyval');
      },
    });
  }

  async setItem(key, value) {
    const item = { id: uuidv4(), value, timestamp: moment().toISOString() };
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(item));
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(key, JSON.stringify(item));
    } else {
      await this.db.put('keyval', item, key);
    }
  }

  async getItem(key) {
    let item;
    if (typeof localStorage !== 'undefined') {
      item = localStorage.getItem(key);
    } else if (typeof sessionStorage !== 'undefined') {
      item = sessionStorage.getItem(key);
    } else {
      item = await this.db.get('keyval', key);
    }
    return isEmpty(item) ? null : JSON.parse(item);
  }

  async removeItem(key) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(key);
    } else {
      await this.db.delete('keyval', key);
    }
  }

  async clear() {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
    } else {
      await this.db.clear('keyval');
    }
  }
}

export default new MicroStorageWrapper();
