import React, { useEffect, useState } from 'react';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UProfile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          console.error("Token not found in localStorage.");
          return;
        }

        // Decode the token to extract user ID
       
        const decoded = jwtDecode(token); 
        console.log("decoded me",decoded)
        const userId = decoded.id; 
        console.log("user id", userId)

        const response = await axios.get(`http://localhost:3004/api/users/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}` // Send token in request headers
          }
        });

        setUser(response.data);
        console.log('our data', response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h1>Welcome to Your Profile</h1>
      <p>This is your profile content:</p>
      

      {/* Render user profile data */}
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))} 
    </div>
  );
};

export default UProfile;
