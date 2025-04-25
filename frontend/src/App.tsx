import "./App.css";
import { Register } from "./components/features/Auth/Register";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Registration Page</h1>
      </header>
      <main>
        <Register />
      </main>
    </div>
  );
}

export default App;
