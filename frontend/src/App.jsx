import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layout/DashboardLayout";
import Inbox from "./pages/Inbox";
import Tasks from "./pages/Tasks";
import FollowUps from "./pages/FollowUps";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import DevTools from "./pages/DevTools";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";


const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  <Route
    path="/"
    element={
      isAuthenticated() ? <DashboardLayout /> : <Navigate to="/login" />
    }
  >
    <Route path="inbox" element={<Inbox />} />
    <Route path="tasks" element={<Tasks />} />
    <Route path="followups" element={<FollowUps />} />
    <Route path="analytics" element={<Analytics />} />
    <Route path="settings" element={<Settings />} />
  </Route>

</Routes>
    </BrowserRouter>
  );
}

export default App;
