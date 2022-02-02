import Home from "./Home";
import "./styles/App.scss";
import ContextProvider from "./store/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Home />
    </ContextProvider>
  );
}

export default App;
