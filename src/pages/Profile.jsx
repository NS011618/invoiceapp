// client/src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Invoice from './Invoice';

function Profile({ user }) {
  const [saasUsage, setSaasUsage] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/usage/${user._id}`, { withCredentials: true })
        .then(response => setSaasUsage(response.data.saasdata))
        .catch(error => console.error('SaaS Usage error:', error));
    }
  }, [user]);

  return (
    <div className="dashboard-container bg-gray-100 p-6 rounded-lg shadow-md mx-auto max-w-2xl">
      <h2 className="text-3xl font-bold mb-4 text-indigo-600">User Dashboard</h2>
      {user ? (
        <div className="dashboard-details grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="profile-card bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Profile Details</h3>
            <p className="text-gray-700"><strong>Display Name:</strong> {user.displayName}</p>
            <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
          </div>
          {saasUsage ? (
            <div className="saas-usage-card bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">SaaS Usage Details</h3>
              <p className="text-gray-700"><strong>Total Users:</strong> {saasUsage.totalUsers}</p>
              <p className="text-gray-700"><strong>Storage Usage:</strong> {saasUsage.storageUsage} GB</p>           
              {/* Add more details as needed */}
              <Invoice user={user} saasUsage={saasUsage} />
            </div>
          ) : (
            <p className="text-gray-700 col-span-2 text-center">Loading SaaS usage details...</p>
          )}
        </div>
      ) : (
        <p className="text-gray-700 text-center">Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
