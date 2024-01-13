// Profile.jsx
import React from 'react';

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
    </div>
  );
}

export default Profile;
