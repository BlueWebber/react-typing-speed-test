import React from "react";
import {
  List,
  ListItem,
  Paper,
  Box,
  Typography,
  Divider,
  IconButton,
  TextField,
  Button,
  Tooltip,
} from "@mui/material";
import { FixedSizeList } from "react-window";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import generateGuid from "../utils/guid";
import _ from "lodash";

let Word = ({
  data: [words, setWords, editingWord, setEditingWord],
  index,
  style,
}) => {
  const word =
    editingWord?.index === index ? editingWord.value : words[index][0];

  const isEditing = editingWord?.index === index;

  const deleteWord = () => {
    setWords((words) => {
      const wordsClone = [...words];
      wordsClone.splice(index, 1);
      return wordsClone;
    });
  };

  const startEdit = () => {
    setEditingWord({ index, value: word });
  };

  const cancelEdit = () => {
    setEditingWord(null);
  };

  const confirmEdit = () => {
    setWords((originalWords) => {
      const wordsClone = [...originalWords];
      const editIndex = wordsClone.indexOf(
        wordsClone.find((word) => word[1] === words[index][1])
      );
      wordsClone[editIndex] = [editingWord.value, wordsClone[index][1]];
      return wordsClone;
    });
    cancelEdit();
  };

  return (
    <Box sx={style}>
      <ListItem>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          {!isEditing ? (
            <>
              <Typography sx={{ fontSize: "115%" }}>{word}</Typography>
              <Box>
                <Tooltip title="Edit">
                  <IconButton sx={{ mr: 1 }} onClick={startEdit}>
                    <EditTwoToneIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={deleteWord}>
                    <ClearRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          ) : (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  confirmEdit();
                }}
              >
                <TextField
                  value={editingWord.value}
                  onChange={({ target }) => {
                    target.value.at(-1) !== " " &&
                      setEditingWord({ index, value: target.value });
                  }}
                  variant="standard"
                  autoFocus
                />
              </form>
              <Box>
                <Button
                  sx={{ mr: 1 }}
                  variant="contained"
                  onClick={confirmEdit}
                >
                  Save
                </Button>
                <Button variant="contained" color="error" onClick={cancelEdit}>
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </Box>
      </ListItem>
      <Divider />
    </Box>
  );
};

Word = React.memo(
  Word,
  (prevProps, nextProps) =>
    _.isEqual(
      prevProps.data[0][nextProps.index],
      nextProps.data[0][nextProps.index]
    ) &&
    !(
      nextProps.data[2]?.index === nextProps.index ||
      prevProps.data[2]?.index === nextProps.index
    )
);

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
