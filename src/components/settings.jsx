import React from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Box,
  Divider,
  Button,
} from "@mui/material";
import WordsViewer from "./wordsViewer/wordsViewer";
import storageVars from "../localStorage";
import generateGuid from "../utils/guid";
import { getWords, getTime } from "../helpers";

const Settings = ({ setSettingsOpen }) => {
  const center = { display: "flex", justifyContent: "center" };
  const [time, setTime] = React.useState(getTime);
  const [words, setWords] = React.useState(() =>
    getWords().map((word) => [word, generateGuid()])
  );

  const cancel = () => {
    setSettingsOpen(false);
  };

  const save = () => {
    localStorage.setItem(
      storageVars.words,
      JSON.stringify(words.map((word) => word[0]).sort())
    );
    localStorage.setItem(storageVars.time, JSON.stringify(time));
    cancel();
  };

  const resetToDefault = () => {
    localStorage.removeItem(storageVars.words);
    localStorage.removeItem(storageVars.time);
    setWords(getWords().map((word) => [word, generateGuid()]));
    setTime(getTime());
  };

  return (
    <Container>
      <Box sx={{ ...center, mt: 1, mb: 2 }}>
        <Typography variant="h5" component="h1">
          Settings
        </Typography>
      </Box>
      <Grid container sx={{ mb: 1 }}>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "110%" }}>
            Test duration (in seconds)
          </Typography>
        </Grid>
        <Grid
          xs={6}
          item
          sx={{ display: "flex", flexDirection: "row-reverse" }}
        >
          <TextField
            type="number"
            inputProps={{
              min: 1,
              step: 1,
            }}
            value={time}
            onChange={({ target }) => setTime(parseInt(Math.abs(target.value)))}
          />
        </Grid>
      </Grid>
      <Box sx={center}>
        <Typography sx={{ fontSize: "120%" }}>Words</Typography>
      </Box>
      <WordsViewer words={words} setWords={setWords} />
      <Divider />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 1, mb: 1 }}
      >
        <Button onClick={resetToDefault}>Reset to default</Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Button color="success" variant="contained" onClick={save}>
            Save
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{ mr: 1 }}
            onClick={cancel}
          >
            Discard
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Settings;
