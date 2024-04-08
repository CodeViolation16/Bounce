import React, { useState, useEffect } from "react";

export function AdminModal() {
  // State to store the list of users
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users when component mounts
    fetch("http://localhost:3002/users/all")
      .then((res) => res.json())
      .then((data) => {
        // Update the users state with the fetched data
        console.log(data);
        data.forEach((user) => console.log(user._id));
        const filteredUsers = data.filter((user) => !user.delete);
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []); // Empty dependency array to run the effect only once on component mount

  const handleSoftDelete = async (userId) => {
    console.log(userId);
    // Send a PATCH request to update the delete field to true
    try {
      const res = await fetch(`http://localhost:3002/users/${userId}/soft-delete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ delete: true }),
      })
      const data = await res.json();
      console.log(data);
    }

    // If successful, fetch the updated list of users
    catch (error) {
      console.error("Error soft deleting user:", error);
    };
  };

  return (
    <div>
      <h1> CLICK TO DELETE USER</h1>
      <div>Show all users:</div>
      <br></br>
      {users.map((user) => (
        <div key={user._id} onClick={() => handleSoftDelete(user._id)}>
          name: {user.name} || email: {user.username}
        </div>
      ))}
    </div>
  );
}

