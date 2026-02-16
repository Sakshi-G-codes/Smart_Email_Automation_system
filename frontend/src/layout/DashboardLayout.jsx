import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkHealth } from "../api";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  // 🔹 API Status State
  const [apiStatus, setApiStatus] = useState("Checking...");

  // 🔹 Run health check once when component loads
  useEffect(() => {
    checkHealth()
      .then((data) => {
        setApiStatus(data.status);
      })
      .catch(() => {
        setApiStatus("Disconnected");
      });
  }, []);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Smart Email</h2>
        <nav>
          <NavLink to="inbox">Inbox</NavLink>
          <NavLink to="tasks">Tasks</NavLink>
          <NavLink to="followups">Follow Ups</NavLink>
          <NavLink to="analytics">Analytics</NavLink>
          <NavLink to="settings">Settings</NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar" style={{ display: "flex", alignItems: "center" }}>
          <h3>Dashboard</h3>

          {/* 🔹 API Status Display */}
          <span style={{ marginLeft: "auto", fontWeight: "bold" }}>
            API: {apiStatus}
          </span>
        </header>

        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
