import React from "react";
import { Landing, Register, Error, ProtectedRoute } from "../src/pages/index.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Stats,
  AddJob,
  AllJobs,
  Profile,
  SharedLayout,
} from "./pages/dashboard/index.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
          // <ProtectedRoute>
            <SharedLayout />
          // </ProtectedRoute>
          }>
            <Route index element={<Stats />} />
            <Route path="/add-job" element={<AddJob />} />
            <Route path="/all-jobs" element={<AllJobs />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/landing" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
