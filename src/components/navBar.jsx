import { AppBar, Toolbar, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useThemeSwitcher, themeTypes } from "../context/themeSwitcher";

const NavBar = () => {
  const [theme, setTheme] = useThemeSwitcher();

  return (
    <AppBar>
      <Toolbar sx={{ display: "flex", justifyContent: "right" }}>
        <IconButton>
          <Brightness4Icon
            onClick={() =>
              theme === themeTypes.dark
                ? setTheme(themeTypes.light)
                : setTheme(themeTypes.dark)
            }
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
