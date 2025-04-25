import "./App.css";
import { StarterPage } from '@/components/features/StarterPage.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./components/features/Auth/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<StarterPage/>} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;