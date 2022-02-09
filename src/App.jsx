import AppWrapper from "./components/appWrapper";
import NavBar from "./components/navBar";

const App = () => {
  return (
    <main>
      <NavBar />
    </main>
  );
};

const Wrapped = () => {
  return (
    <AppWrapper>
      <App />
    </AppWrapper>
  );
};

export default Wrapped;
