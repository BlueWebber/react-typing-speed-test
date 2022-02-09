import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useThemeSwitcher, themeTypes } from "../context/themeSwitcher";

const NavBar = () => {
  const [theme, setTheme] = useThemeSwitcher();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" component="label">
          Typing Speed Test
        </Typography>
        <Tooltip title="Switch Theme">
          <IconButton
            onClick={() =>
              theme === themeTypes.dark
                ? setTheme(themeTypes.light)
                : setTheme(themeTypes.dark)
            }
            sx={{ position: "absolute", top: "9px", right: "8px" }}
          >
            <Brightness4Icon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
