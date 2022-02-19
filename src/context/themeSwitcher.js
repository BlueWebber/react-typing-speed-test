import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import DarkBg from "../assets/backgrounds/dark.png";
import LightBg from "../assets/backgrounds/light.png";

const ThemeSwitcherContext = React.createContext();
ThemeSwitcherContext.displayName = "ThemeContext";

const themeTypes = {
  dark: "dark",
  light: "light",
};

const config = {
  typography: {
    button: {
      textTransform: "none",
    },
  },
};

const lightTheme = createTheme({ palette: { mode: "light" }, ...config });
const darkTheme = createTheme({ palette: { mode: "dark" }, ...config });

const ThemeSwitcherProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(themeTypes.dark);

  return (
    <ThemeSwitcherContext.Provider value={[theme, setTheme]}>
      <ThemeProvider theme={theme === themeTypes.dark ? darkTheme : lightTheme}>
        <CssBaseline enableColorScheme />
        <GlobalStyles
          styles={{
            body: {
              backgroundImage: `url(${
                theme === themeTypes.dark ? DarkBg : LightBg
              })`,
            },
          }}
        />
        {children}
      </ThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
};

const useThemeSwitcher = () => React.useContext(ThemeSwitcherContext);

export { ThemeSwitcherProvider, useThemeSwitcher, themeTypes };
