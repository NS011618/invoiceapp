// Profile.jsx
import React from 'react';
import { Link } from 'react-router-dom'

function Profile({ user }) {
  if (!user) {
    return <p>Loading...</p>;
  }

  const displayName = user?.displayName || 'Unknown User';

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {displayName}!</p>
      {/* Additional profile content */}

      {/* SaaS usage details */}
      <Link to="/saasusage">SaaS Usage Details</Link>
      
    </div>
  );
}

export default Profile;
