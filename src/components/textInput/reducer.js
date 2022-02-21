import generateGuid from "../../utils/guid";

const actionTypes = {
  endWord: "endWord",
  addChar: "addChar",
  removeChar: "removeChar",
};

// \u00A0 is a non-breaking space

const reducer = (state, action) => {
  const stateCurrentWord = state.shuffledWords[state.typingIndex];
  const stateLastInput = state.inputs[state.typingIndex] || {};

  switch (action.type) {
    case actionTypes.endWord: {
      const isCorrect = stateCurrentWord === stateLastInput.word;

      return {
        ...state,
        typingIndex: state.typingIndex + 1,
        joinedWords: isCorrect
          ? state.joinedWords.slice(1)
          : state.joinedWords.substr(state.joinedWords.indexOf("\u00A0") + 1),
        numberOfTypedWords: state.numberOfTypedWords + 1,

        inputs: [
          ...state.inputs.slice(0, -1),
          { ...stateLastInput, isCorrect, isFinished: true },
          { key: generateGuid() },
        ],

        ...(isCorrect && {
          numberOfCorrectCharacters:
            state.numberOfCorrectCharacters + stateCurrentWord.length,
          numberOfCorrectWords: state.numberOfCorrectWords + 1,
        }),
      };
    }

    case actionTypes.removeChar: {
      const newWord = stateLastInput.word.slice(0, -1);

      return {
        ...state,

        inputs: [
          ...state.inputs.slice(0, -1),
          {
            word: newWord,
            key: stateLastInput.key,
            isCorrect: stateCurrentWord.startsWith(newWord),
          },
        ],

        ...(stateCurrentWord.startsWith(stateLastInput.word) && {
          joinedWords: stateLastInput.word.at(-1) + state.joinedWords,
        }),
      };
    }

    case actionTypes.addChar: {
      const newWord = stateLastInput.word
        ? stateLastInput.word + action.payload.key
        : action.payload.key;
      const isNewCorrect = stateCurrentWord.startsWith(newWord);

      return {
        ...state,

        inputs: [
          ...state.inputs.slice(0, -1),
          {
            word: newWord,
            key: stateLastInput.word ? stateLastInput.key : generateGuid(),
            isCorrect: isNewCorrect,
          },
        ],

        ...(isNewCorrect && {
          joinedWords: state.joinedWords.slice(1),
        }),
      };
    }

    default: {
      throw new Error("Unknown action type");
    }
  }
};

export { reducer, actionTypes };
