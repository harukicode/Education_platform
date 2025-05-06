import "./App.css";
import { StarterPage } from "@/components/features/StarterPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./components/features/Auth/Register";
import { Login } from "./components/features/Auth/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<StarterPage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
