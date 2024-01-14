import React from "react";
import Saasusage from "./Saasusage";

function Profile({ user }) {
  if (!user) {
    return <p>Loading...</p>;
  }

  const displayName = user?.displayName || "Unknown User";

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {displayName}!</p>
      
   
      <Saasusage user={user} />
    </div>
  );
}

export default Profile;
