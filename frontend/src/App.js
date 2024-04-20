import React, { useEffect, useState } from 'react'; 
import SignUpForm from "./SignUpForm"
import { Routes, Route } from 'react-router-dom';

import MainContent from './MainContent';
import LoginForm from './loginForm';
import { UserStats, UserInfo } from './UserProfile'; // Import here
import HeroSection from './HeroSection';
import Blogs from './Blogs'; 
import Card1 from "./PostDetails"
import PostDetails from './PostDetails'; 
import Footer from './Footer';
import axios from 'axios';  
import Profile from './Profile'

 



function App() {
 
const [posts, setPosts] = useState([])
console.log('post1',posts);
useEffect(() => {
    getPost()
}, [])

const getPost = async() => {
  try {
      const response = await axios.get('http://localhost:3004/api/posts');
      setPosts(response.data);
      console.log('post _id',posts[1]._id)
     
  } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des articles:', error);
      // Gérer l'erreur, par exemple en affichant un message à l'utilisateur ou en journalisant l'erreur pour le débogage
  }
}

  const [editedPost, setEditedPost] = useState(null); 
  useEffect(() => {
    updatePost()
}, [])    
const updatePost = async (id, updatedPostData) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the authentication token
    const response = await axios.put(
      `http://localhost:3004/api/posts/${id}`,
      updatedPostData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      }
    );
    console.log('Updated post:', response.data);
    // Optionally, update the state with the response data if needed
  } catch (error) {
    console.error('Error updating post:', error);
  }
};










  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const handleEdit = (post) => {
    setEditedPost(post);
  };

  const handleSaveEdit = (id, newTitle, newDescription) => {
    const updatedPostData = { title: newTitle, description: newDescription };
    updatePost(id, updatedPostData);
    setEditedPost(null);
  };
  

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      console.log("iddd",postId)
      const response = await axios.delete(`http://localhost:3004/api/posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Remove the deleted post from the state
      setPosts(posts.filter(post => post.id !== postId));
      console.log('Post deleted successfully:', response);
    } catch (error) {
      console.error('An error occurred while deleting the post:', error);
      // Handle error, notify the user, etc.
    }
  };
  
  return (
      <Routes>
        <Route path="mainContent" element={
          <MainContent
            posts={posts}
            onAddPost={handleAddPost}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEdit}
            onDelete={handleDelete}
            editedPost={editedPost}
            setEditedPost={setEditedPost}
          />
        } />
        <Route path="/login" element={<LoginForm />} /> 
        <Route path="/post-details/:id" element={<PostDetails />} />

        <Route path="/signUpForm" element={<SignUpForm />} />
        <Route path="/new-post" element={ <MainContent
            posts={posts}
            onAddPost={handleAddPost}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEdit}
            onDelete={handleDelete}
            editedPost={editedPost}
            setEditedPost={setEditedPost}
          />}  />  
        <Route path="/" element={<HomePage/> } /> 
        <Route path="/Blogs" element={   <Blogs post={posts}/>} /> 
        <Route path="/profile" element={   <Profile/>} />
       
      </Routes> 
    
    
  );
} 
function HomePage() {
  return (
    <>
      <HeroSection />
      <Blogs />
    </>
  );
} 
function Blog() {
  return (
    <>
      
      <Blogs />
    </>
  );
}  


export default App;
