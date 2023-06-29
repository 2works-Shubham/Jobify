import React from "react";
import { Landing, Register, Dashboard } from "../src/pages/index.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />      
          <Route path="/landing" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
