import { CountdownCircleTimer } from "react-countdown-circle-timer";
import TimerTypo from "./timerTypo";
import { useTheme } from "@mui/material/styles";

const CircleTimer = ({ green, yellow, red, duration, isPlaying }) => {
  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={duration}
      colors={[green, yellow, red]}
      colorsTime={[duration, 30, 0]}
      size={90}
      strokeWidth={5}
    >
      {TimerTypo}
    </CountdownCircleTimer>
  );
};

const CircleTimerWrapper = (props) => {
  const { palette } = useTheme();
  return (
    <CircleTimer
      green={palette.success.main}
      yellow={palette.warning.main}
      red={palette.error.main}
      {...props}
    />
  );
};

export default CircleTimerWrapper;
