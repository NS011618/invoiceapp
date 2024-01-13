// src/pages/SaasUsage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Saasusage = () => {
  const [saasUsageData, setSaasUsageData] = useState(null);

  useEffect(() => {
    // Fetch SaaS usage details
    axios
      .get("http://localhost:5000/usage", {
        withCredentials: true,
      })
      .then((response) => {
        setSaasUsageData(response.data.saasdata);
        console.log("SaaS Usage data:", response.data.saasdata);
      })
      .catch((error) => {
        console.error("SaaS Usage error:", error);
      });
  }, []);

  if (!saasUsageData) {
    return <p>Loading SaaS usage details...</p>;
  }

  // Display SaaS usage details
  return (
    <div>
      <h2>SaaS Usage Details</h2>
      {/* Customize the rendering based on your data structure */}
      <ul>
        <li>Total Users: {saasUsageData.totalUsers}</li>
        <li>Storage Usage: {saasUsageData.storageUsage} GB</li>
        {/* Add more details as needed */}
      </ul>
    </div>
  );
};

export default Saasusage;
