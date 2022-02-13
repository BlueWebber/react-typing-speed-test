import { Typography, Box } from "@mui/material";

const TimerTypo = ({ remainingTime }) => {
  let timeType = "Seconds";
  let formattedTime = remainingTime;
  const flooredTime = Math.floor(remainingTime / 60);

  if (flooredTime >= 1) {
    timeType = flooredTime > 1 ? "Minutes" : "Minute";
    formattedTime = flooredTime;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Typography variant="h5" component="label">
        {formattedTime}
      </Typography>
      <Typography variant="caption" sx={{ fontSize: 12 }}>
        {timeType}
      </Typography>
    </Box>
  );
};

export default TimerTypo;
