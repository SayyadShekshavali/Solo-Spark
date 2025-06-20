import { useState } from "react";

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/quiz";
import Quest from "./pages/Quest";
import Progress from "./pages/Progress";

function App() {
  const user = localStorage.getItem("Name");
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={!user ? <Home /> : <Navigate to="/progress" />}
          />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quest" element={<Quest />} />{" "}
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
