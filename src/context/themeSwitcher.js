import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const ThemeSwitcherContext = React.createContext();
ThemeSwitcherContext.displayName = "ThemeContext";

const themeTypes = {
  dark: "dark",
  light: "light",
};

const lightTheme = createTheme({ palette: { mode: "light" } });
const darkTheme = createTheme({ palette: { mode: "dark" } });

const ThemeSwitcherProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(themeTypes.dark);

  return (
    <ThemeSwitcherContext.Provider value={[theme, setTheme]}>
      <ThemeProvider theme={theme === themeTypes.dark ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
};

const useThemeSwitcher = () => React.useContext(ThemeSwitcherContext);

export { ThemeSwitcherProvider, useThemeSwitcher, themeTypes };
