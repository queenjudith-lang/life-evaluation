// Not used in MVP but ready for extension
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('LifeRPG', 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('sync')) {
        db.createObjectStore('sync', { keyPath: 'id' });
      }
    };
  });
};