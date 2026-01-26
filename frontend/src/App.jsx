import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardOne from "./pages/dashboardOne";
import DashboardTwo from "./pages/dashboardTwo";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <h1>Smart Email Solutions</h1>

      <Routes>
        <Route path="/" element={<DashboardOne />} />
        <Route path="/dashboard-two" element={<DashboardTwo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
