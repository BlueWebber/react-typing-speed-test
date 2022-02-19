import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

let Transition = (props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
};

Transition = React.forwardRef(Transition);

const ResultDialog = ({
  statistics: { cpm, wpm, accuracy },
  handleRestart,
  handleSettings,
}) => {
  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleRestart}
    >
      <DialogTitle>{"Time's up!"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Good job! Your net typing speed is {wpm} words per minute ({cpm}{" "}
          characters per minute). Your typing accuracy was {accuracy}%!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRestart}>Restart</Button>
        <Button onClick={handleSettings}>Settings</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResultDialog;
