import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Types from "./pages/types/types";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/types/:id/:name" element={<Types />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
