import React from "react";
import { Box, Tooltip, Typography, IconButton } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SpeedData from "./speedData";
import CircleTimer from "./circleTimer";
import TextInput from "./textInput/textInput";
import { getTime } from "../helpers";
import ResultDialog from "./resultDialog";

const TypingTest = ({ setSettingsOpen, handleRestart }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [statistics, setStatistics] = React.useState({
    wpm: 0,
    cpm: 0,
    accuracy: 0,
  });
  const [isFinished, setIsFinished] = React.useState(false);

  const duration = React.useMemo(getTime, []);

  React.useEffect(() => {
    return () => {
      setIsPlaying(false);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 1,
          mb: 2,
          position: "relative",
        }}
      >
        <Typography variant="h5" component="h1">
          Test your typing speed
        </Typography>
        <Tooltip title="Configure">
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 4,
            }}
            onClick={() => setSettingsOpen(true)}
          >
            <SettingsOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <CircleTimer duration={duration} isPlaying={isPlaying} />
        <SpeedData title="words/min">{statistics.wpm}</SpeedData>
        <SpeedData title="chars/min">{statistics.cpm}</SpeedData>
        <SpeedData title="accuracy %">{statistics.accuracy}</SpeedData>
      </Box>
      <TextInput
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setStatistics={setStatistics}
        isFinished={isFinished}
        setIsFinished={setIsFinished}
        duration={duration}
      />
      {isFinished && (
        <ResultDialog
          statistics={statistics}
          handleRestart={handleRestart}
          handleSettings={() => setSettingsOpen(true)}
        />
      )}
    </>
  );
};

export default TypingTest;
