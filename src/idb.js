import { openDB } from "idb";

const dbPromise = openDB("reports-store", 1, {
  upgrade(db) {
    db.createObjectStore("reports");
  },
});

export const idbKeyval = {
  async get(key) {
    return (await dbPromise).get("reports", key);
  },
  async set(key, val) {
    return (await dbPromise).put("reports", val, key);
  },
  async delete(key) {
    return (await dbPromise).delete("reports", key);
  },
  async clear() {
    return (await dbPromise).clear("reports");
  },
  async keys() {
    return (await dbPromise).getAllKeys("reports");
  },
};
