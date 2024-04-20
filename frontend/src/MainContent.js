import React, { useEffect, useState } from 'react';
import axios from "axios"; 
import { jwtDecode } from "jwt-decode";

import { UserStats, UserInfo } from './UserProfile'; // Import here

const MainContent = ({
  posts = [],
  onAddPost,
  onEdit,
  onSaveEdit,
  onDelete,
  editedPost,
  setEditedPost,
}) => {
  
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 
  const [user, setUser] = useState(posts[0]); 
     
 





  // const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   // Récupérer les informations de l'utilisateur actuellement connecté
  //   const token = localStorage.getItem('token'); 
  //   console.log("tokeeeen",token)
  //   if (token) {
  //     axios.get('http://localhost:3004/api/user', {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     })
  //     .then(response => {
  //       setCurrentUser(response.data); // Stocker les informations de l'utilisateur dans le state
  //     })
  //     .catch(error => {
  //       console.error('Error fetching user data:', error);
  //     });
  //   }
  // }, []);






  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token'); 
    const decoded = jwtDecode(token); 
    return decoded.id;
    // Logic to extract user ID from token and return it
  };

  const [userId, setUserId] = useState(getUserIdFromToken());





  const [CreatedPost, setCreatedPost] = useState([])
  console.log('createdpost',CreatedPost);
  useEffect(() => {
      CreatePost()
  }, [])

  const CreatePost = async() => {
      try {
        
          const response = await axios.post('http://localhost:3004/api/posts');
          setCreatedPost(response.data);
        console("the data ",response.data)
         
      } catch (error) {
          console.error(error.response);
          // Gérer l'erreur, par exemple en affichant un message à l'utilisateur ou en journalisant l'erreur pour le débogage
      }
  } 

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  
  // const handleAddPost = async () => {
  //   if (!newPostTitle || !newPostDescription || !newPostImage) {
  //     alert("Please fill in both title, description, and upload an image.");
  //     return;
  //   }
  
  //   const token = localStorage.getItem('token'); // Récupérer le jeton d'authentification depuis le localStorage
  // console.log(newPostImage);
  //   const newPost = {
  //     id: Date.now(),
  //     title: newPostTitle,
  //     description: newPostDescription,
  //     image: newPostImage.name,
  //   };
  
  //   try {
  //     console.log(newPost);
  //     const response = await axios.post(
  //       'http://localhost:3004/api/posts',
  //       newPost,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //           'Authorization': `Bearer ${token}` // Inclure le jeton dans l'en-tête de la requête
  //         }
  //       }
  //     );
  // console.log("imagyyUrl",newPost.imgUrl)
  //     // Mettre à jour l'état avec le nouveau post créé par le backend
  //     onAddPost(response.data); 
  //     console.log("data",response.data)
  
  //     // Réinitialiser les valeurs des champs de saisie
  //     setNewPostTitle("");
  //     setNewPostDescription("");
  //     // setNewPostImage(null);
  
  //     // Masquer la fenêtre contextuelle de création de post
  //     setShowPopup(false);
  //   } catch (error) {
  //     console.log(error.response);
  //     // Gérer l'erreur, par exemple en affichant un message à l'utilisateur ou en journalisant l'erreur pour le débogage
  //   }
  // };
  
  const handleAddPost = async () => {
    if (!newPostTitle || !newPostDescription || !newPostImage) {
      alert("Please fill in both title, description, and upload an image.");
      return;

    }
  
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', newPostTitle);
    formData.append('description', newPostDescription);
    formData.append('image', newPostImage); // Here newPostImage should be the file object
  
    try {
      const response = await axios.post(
        'http://localhost:3004/api/posts',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          } 
        }
      ); 
      console.log('File object:', newPostImage);

  
      onAddPost(response.data);
      setNewPostTitle("");
      setNewPostDescription("");
      setNewPostImage(null);
      setShowPopup(false);

    } catch (error) {
      console.error('An error occurred while adding a post:', error);
    }
  };
  
  

   const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setNewPostImage(file); // Store the file object in state
    }
  };
 

  function UserInfo() { 


    return ( 
      
        <div className="text-center mt-6"> 
      
      
          <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">Jenna Stones</h3>
          <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
            Los Angeles, California
          </div>
          <div className="mb-2 text-blueGray-600 mt-6">
            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
            Solution Manager - Creative Tim Officer
          </div>
          <div className="mb-2 text-blueGray-600">
            <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
            University of Computer Science
          </div>
        </div>
      );
    } 

    function UserStats() {  
      return (
        <div className="flex justify-center py-4 lg:pt-4 pt-8">
          <div className="mr-4 p-3 text-center">
            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span>
            <span className="text-sm text-blueGray-400">Likes</span>
          </div>
          <div className="mr-4 p-3 text-center">
            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span>
            <span className="text-sm text-blueGray-400">Blogs</span>
          </div>
          <div className="lg:mr-4 p-3 text-center">
            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span>
            <span className="text-sm text-bclueGray-400">Comments</span>
          </div>
        </div>
      );
    }


  
  return (
    <main className="main-content"> 
    <h1 className="text-3xl font-bold mb-4">Welcome to your Profile </h1>
      <p className="mb-8">
        This blog shares insights, stories, and tips on various topics ranging from technology to lifestyle. Here, you can find articles that inspire, educate, and entertain. Whether you're looking for advice on your next tech project, tips for your health and well-being, or just a good read to relax, you've come to the right place. Dive in to explore the content that interests you the most.
      </p> 
      <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto mt-10 flex justify-center"> {/* Changed flex justify-end to flex justify-center */}
          <div className="relative" style={{ marginLeft: '2px' }}> {/* Added inline style for margin-left */}
            <img
              alt="..."
              src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
              style={{ maxWidth: '100px' }}
              className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
            />
          </div>
        </div>
        <div className="w-full lg:w-4/12 px-4 mx-auto mt-10"> {/* Changed lg:w-4/122 to lg:w-4/12 */}
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
            <div className="px-6">
              <UserStats /> 
              <button
        onClick={togglePopup}
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
      >
        Create post
      </button>

              <UserInfo />
            
            </div>
          </div>
        </div>
      </section>

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg">
            <button
              onClick={togglePopup}
              className="absolute top-[-30px] right-[-19px] bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md"
            >
              X
            </button>
            <input
              type="text"
              className="form-input block w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <textarea
              className="form-textarea block w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter description"
              value={newPostDescription}
              onChange={(e) => setNewPostDescription(e.target.value)}
            />
            <label htmlFor="image" className="font-sans block mb-4">
              Upload Image:
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md mr-2"
              onClick={handleAddPost}
            >
              Submit
            </button>
          </div>
        </div>
      )}
 






 
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
  {posts.length > 0 ? ( 

posts
.filter((post) => post.user._id=== userId) // Filtrer les posts pour ne récupérer que ceux de l'utilisateur actuellement connecté



    .map((post) => (
      <div key={post.id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
         {console.log("post details",post.user._id)} 
        {editedPost && editedPost.id === post.id ? (
       
          <div className="p-6">
            <input
              type="text"
              value={editedPost.title}
              onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
            <textarea
              value={editedPost.description}
              onChange={(e) => setEditedPost({ ...editedPost, description: e.target.value })}
              className="w-full h-40 px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md mr-2"
              onClick={() => onSaveEdit(editedPost.id, editedPost.title, editedPost.description)}
            >
              Save Edit
            </button>
          </div>
        ) : (
          // Display post details 
          <div> 
           {post.image && (
                <img src={post.image.url} alt={post.title} className="w-full h-48 object-cover" />
              )}
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.description}</p>
              <div className="flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2" onClick={() => onEdit(post)}>Edit</button>
                <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded" onClick={() => onDelete(post.id)}>Delete</button> 
               
    </div>
            </div>
          </div>
        )}
      </div>
    ))
  ) : (
    <p className="col-span-3 text-center">No posts found</p>
  )}
</div>

    </main>
  );
};

export default MainContent;


