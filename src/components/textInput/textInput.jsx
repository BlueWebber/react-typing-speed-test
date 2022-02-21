import React from "react";
import { Paper, Typography, Grid } from "@mui/material";
import styled from "@emotion/styled";
import shuffle from "../../utils/shuffle";
import { reducer, actionTypes } from "./reducer";
import { getWords } from "../../helpers";

const StyledTextInput = styled.input`
  width: 5px;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  outline: 0;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 2rem;
  font-family: inherit;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

const Span = styled.span`
  color: ${({ theme, isFinished }) =>
    isFinished ? theme.palette.text.primary : theme.palette.info.main};
  text-decoration: ${({ isCorrect }) => (isCorrect ? "none" : "line-through")};
  opacity: ${({ isFinished }) => (isFinished ? 0.5 : 1)};
`;

// \u00A0 is a non-breaking space

const TextInput = ({
  isPlaying,
  setIsPlaying,
  setStatistics,
  duration,
  isFinished,
  setIsFinished,
}) => {
  const shuffledWords = React.useMemo(
    () => shuffle([...getWords()]).slice(0, duration < 250 ? 500 : 5000),
    [duration]
  );

  const [state, dispatch] = React.useReducer(reducer, {}, () => ({
    shuffledWords,
    joinedWords: shuffledWords.join("\u00A0"),
    numberOfTypedCharacters: 0,
    numberOfCorrectCharacters: 0,
    numberOfTypedWords: 0,
    numberOfCorrectWords: 0,
    inputs: [],
    typingIndex: 0,
  }));

  React.useEffect(() => {
    setStatistics({
      cpm: Math.round(state.numberOfCorrectCharacters / (duration / 60)),
      accuracy: Math.round(
        (state.numberOfCorrectWords / state.numberOfTypedWords) * 100 || 0
      ),
      wpm: Math.round(state.numberOfCorrectCharacters / 5 / (duration / 60)),
    });
  }, [
    duration,
    setStatistics,
    state.numberOfCorrectCharacters,
    state.numberOfCorrectWords,
    state.numberOfTypedWords,
  ]);

  React.useEffect(() => {
    isPlaying &&
      setTimeout(() => {
        setIsFinished(true);
      }, duration * 1000);
  }, [isPlaying, duration, setIsFinished]);

  const handleInputChange = (e) => {
    const key = e.key.toLowerCase();

    if (key === " ") {
      dispatch({ type: actionTypes.endWord });
    } else if (key.length !== 1) {
      if (key === "backspace" && state.inputs[state.typingIndex].word) {
        dispatch({ type: actionTypes.removeChar });
      }
    } else {
      dispatch({ type: actionTypes.addChar, payload: { key } });
    }

    if (isPlaying !== true) setIsPlaying(true);
  };

  return (
    <Paper
      sx={{
        backgroundImage: "none",
        mr: 5,
        ml: 5,
        mt: 5,
        mb: 5,
        display: "flex",
        justifyContent: "stretch",
        fontFamily: '"Kalam", cursive',
        pt: 3,
        pb: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <StyledTextInput
        autoFocus
        onBlur={(e) => e.target.focus()}
        value=""
        onKeyDown={handleInputChange}
        onChange={() => {}}
        disabled={isFinished}
      />
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            direction: "rtl",
          }}
        >
          <Typography
            sx={{
              fontFamily: "inherit",
              fontSize: 30,
              whiteSpace: "nowrap",
              textAlign: "right",
            }}
          >
            {state.inputs.map(({ word, key, isCorrect, isFinished }) => (
              <React.Fragment key={key}>
                <Span isCorrect={isCorrect} isFinished={isFinished}>
                  {word}
                </Span>
                {isFinished ? "\u00A0\u200E" : ""}
              </React.Fragment>
            ))}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{
              fontFamily: "inherit",
              fontSize: 30,
              whiteSpace: "nowrap",
            }}
          >
            {state.joinedWords}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TextInput;
