import Home from './Home';
import './App.css';
import ContextProvider from './store/ContextProvider';

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Home />
      </div>
    </ContextProvider>
  );
}

export default App;
