import AppWrapper from "./components/appWrapper";

const App = () => {
  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  );
};

const Wrapped = () => {
  <AppWrapper>
    <App />
  </AppWrapper>;
};

export default Wrapped;
