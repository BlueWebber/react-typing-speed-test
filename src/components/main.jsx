import React from "react";
import {
  Paper,
  Box,
  Tooltip,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SpeedData from "./speedData";
import CircleTimer from "./circleTimer";
import TextInput from "./textInput";

const Main = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [statistics, setStatistics] = React.useState({
    wpm: 0,
    cpm: 0,
    accuracy: 0,
  });

  const getElapsedTime = React.useCallback(() => 20, []);

  return (
    <Container
      sx={{
        marginTop: "30vh",
      }}
    >
      <Paper sx={{ display: "flex", flexDirection: "column", borderRadius: 2 }}>
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
          <CircleTimer duration={40} isPlaying={isPlaying} />
          <SpeedData title="words/min">{statistics.wpm}</SpeedData>
          <SpeedData title="chars/min">{statistics.cpm}</SpeedData>
          <SpeedData title="accuracy %">{statistics.accuracy}</SpeedData>
        </Box>
        <TextInput
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setStatistics={setStatistics}
          numberOfWords={500}
          getElapsedTime={getElapsedTime}
        />
      </Paper>
    </Container>
  );
};

export default Main;
