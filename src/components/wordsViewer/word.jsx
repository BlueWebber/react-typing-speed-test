import React from "react";
import {
  ListItem,
  Box,
  Typography,
  Divider,
  IconButton,
  TextField,
  Button,
  Tooltip,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
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

export default Word;
