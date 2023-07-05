import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  console.log(user);
  if (!user) {
    // Handle the case when the user object is undefined or null
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>{user.name}</h3> {/* Make sure 'user' and 'name' exist before accessing */}
      <p>Name: {user.Name}</p>
      <p>Phone: {user.phone}</p>
      <Link to={`/users/${user._id}`}>View Details</Link>
    </div>
  );
};

export default UserCard;
