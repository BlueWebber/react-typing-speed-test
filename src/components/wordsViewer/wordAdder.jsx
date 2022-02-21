import React from "react";
import { ListItem, Box, Divider, TextField, Button } from "@mui/material";
import generateGuid from "../../utils/guid";

let WordAdder = ({ words, setWords, setSearchedWords }) => {
  const [value, setValue] = React.useState("");
  const submitWord = () => {
    if (value === "") return;
    setWords([[value.toLowerCase(), generateGuid()], ...words]);
  };

  const findWord = () => {
    setSearchedWords({
      filter: value,
      words: words.filter((searchWord) => searchWord[0].includes(value)),
    });
  };

  return (
    <Box>
      <ListItem>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              findWord();
            }}
          >
            <TextField
              placeholder="Word..."
              value={value}
              onChange={({ target }) => setValue(target.value)}
              autoComplete="off"
              autoFocus
              type="search"
            />
          </form>
          <Box sx={{ display: "flex", "& button": { fontSize: "105%" } }}>
            <Button
              variant="contained"
              color="success"
              onClick={submitWord}
              sx={{ mr: 1 }}
            >
              Add Word
            </Button>
            <Button variant="contained" onClick={findWord}>
              Find Word
            </Button>
          </Box>
        </Box>
      </ListItem>
      <Divider />
    </Box>
  );
};

WordAdder = React.memo(WordAdder);

export default WordAdder;
