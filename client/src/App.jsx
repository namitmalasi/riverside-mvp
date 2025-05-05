import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinRoom from "./pages/JoinRoom";
import Studio from "./pages/Studio";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JoinRoom />} />
        <Route path="/studio/:roomId" element={<Studio />} />
      </Routes>
    </Router>
  );
}

export default App;
