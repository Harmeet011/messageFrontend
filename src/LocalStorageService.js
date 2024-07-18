const localStorageService = {
    set(key, value) {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (e) {
        console.error(`Error setting localStorage key “${key}”:`, e);
      }
    },
  
    get(key) {
      try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) return null;
        return JSON.parse(serializedValue);
      } catch (e) {
        console.error(`Error getting localStorage key “${key}”:`, e);
        return null;
      }
    },
  
    clear() {
      try {
        localStorage.clear();
      } catch (e) {
        console.error('Error clearing localStorage:', e);
      }
    }
  };
  
  export default localStorageService;
  