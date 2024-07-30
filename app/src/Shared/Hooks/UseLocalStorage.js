import { useState } from "react"

const isJSON = (val) => { 
  try {
    JSON.parse(val);
    return true;
  }
  catch(e) { 
    return false;
  }
};

const useLocalStorage = (key, initialValue) => { 
  const [value, setValue] = useState(() => {
     const value = localStorage.getItem(key);
     return !value ? initialValue : isJSON(value) ? JSON.parse(value) : value;
  });

  const setItem = (value) => { 
    const isObject = typeof value === 'object' && value !== null;
    setValue(value);
    localStorage.setItem(key, isObject ? JSON.stringify(value) : value);
  }

  return [value, setItem];
}

export default useLocalStorage;