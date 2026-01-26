import ApiStatus from "../components/ApiStatus";
import { useNavigate } from "react-router-dom";

const DashboardOne = () => {
  const navigate = useNavigate();

  const goToFetchSync = () => {
    navigate("/dashboard-two");
  };

  return (
    <div>
      <h2>Health and Send Test</h2>

      <ApiStatus />

      {/* Navigation Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button onClick={goToFetchSync}>
          Fetch & Sync Emails →
        </button>
      </div>
    </div>
  );
};

export default DashboardOne;
