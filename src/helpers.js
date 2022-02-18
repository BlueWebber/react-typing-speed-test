import storageVars from "./localStorage";
import defaultWords from "./assets/words.json";

const getTime = () => parseInt(localStorage.getItem(storageVars.time)) || 60;
const getWords = () => {
  const localWords = localStorage.getItem(storageVars.words);
  return localWords ? JSON.parse(localWords) : defaultWords;
};

export { getTime, getWords };
