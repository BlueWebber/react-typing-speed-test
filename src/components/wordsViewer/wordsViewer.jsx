import React from "react";
import { List, Paper, Box, Typography } from "@mui/material";
import { FixedSizeList } from "react-window";
import WordAdder from "./wordAdder";
import Word from "./word";

let WordsViewer = ({ words, setWords }) => {
  const [searchedWords, setSearchedWords] = React.useState({
    words,
    filter: null,
  });
  const [editingWord, setEditingWord] = React.useState();
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    isMounted.current = true;
  }, []);

  React.useEffect(() => {
    isMounted.current &&
      setSearchedWords(({ filter }) => ({
        filter,
        words: filter ? words.filter(([word]) => word.includes(filter)) : words,
      }));
  }, [words]);

  const height =
    Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    ) / 3;

  return (
    <Paper elevation={2} sx={{ backgroundImage: "none" }}>
      <List sx={{ mb: 1, mt: 1 }}>
        <WordAdder
          setWords={setWords}
          setSearchedWords={setSearchedWords}
          words={words}
        />
        {searchedWords.words.length ? (
          <FixedSizeList
            height={height}
            itemCount={searchedWords.words.length}
            itemSize={60}
            itemData={[
              searchedWords.words,
              setWords,
              editingWord,
              setEditingWord,
            ]}
            itemKey={(index, data) => data[0][index][1]}
          >
            {Word}
          </FixedSizeList>
        ) : (
          <Box
            sx={{
              height,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: "130%" }}>No results</Typography>
          </Box>
        )}
      </List>
    </Paper>
  );
};

WordsViewer = React.memo(WordsViewer);

export default WordsViewer;
