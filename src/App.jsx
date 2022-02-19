import AppWrapper from "./components/appWrapper";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import Main from "./components/main";

const App = () => {
  return (
    <>
      <NavBar />
      <main>
        <Main />
      </main>
      <Footer />
    </>
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
