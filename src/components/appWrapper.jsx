import { ThemeSwitcherProvider } from "../context/themeSwitcher";

const AppWrapper = ({ children }) => {
  return <ThemeSwitcherProvider>{children}</ThemeSwitcherProvider>;
};

export default AppWrapper;
