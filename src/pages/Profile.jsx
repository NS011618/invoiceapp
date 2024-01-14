// client/src/components/Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Invoice from "./Invoice";

function Profile({ user }) {
  const [saasUsage, setSaasUsage] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/usage/${user._id}`, {
          withCredentials: true,
        })
        .then((response) => setSaasUsage(response.data.saasdata))
        .catch((error) => console.error("SaaS Usage error:", error));
    }
  }, [user]);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="w-1/2 p-8">
        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Profile Details
              </h3>
              <p className="text-gray-700">
                <strong>Display Name:</strong> {user.displayName}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 text-center">Loading profile...</p>
        )}
      </div>

      <div className="w-1/2 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            SaaS Usage Details
          </h3>

          {saasUsage ? (
            <div>
              <p className="text-gray-700">
                <strong>Total Users:</strong> {saasUsage.totalUsers}
              </p>
              <p className="text-gray-700">
                <strong>Storage Usage:</strong> {saasUsage.storageUsage} KB
              </p>
              {/* Add more details as needed */}
              <Invoice user={user} saasUsage={saasUsage} />
            </div>
          ) : (
            <p className="text-gray-700 text-center">
              Loading SaaS usage details...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
