import React from "react";
import { Paper, Container } from "@mui/material";
import Settings from "./settings";
import TypingTest from "./typingTest";

const Main = () => {
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  return (
    <Container
      sx={{
        marginTop: settingsOpen ? "10vh" : "20vh",
      }}
    >
      <Paper sx={{ display: "flex", flexDirection: "column", borderRadius: 2 }}>
        {!settingsOpen ? (
          <TypingTest setSettingsOpen={setSettingsOpen} />
        ) : (
          <Settings setSettingsOpen={setSettingsOpen} />
        )}
      </Paper>
    </Container>
  );
};

export default Main;
