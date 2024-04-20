// Utilisez useParams pour récupérer l'ID du post de l'URL
// import React from 'react';
// import { useParams } from 'react-router-dom';

// export default function PostDetails({ posts1 }) {
//     const { id } = useParams();
//     const post = posts1.find(post => post.id === parseInt(id));

//     if (!post) {
//         return <div>Aucun post trouvé</div>;
//     }

//     return (
//         <div className="container mx-auto mt-12">
//             <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//                 <img className="w-full h-64 object-cover object-center" src={post.imgUrl} alt={post.title} />
//                 <div className="p-6">
//                     <h2 className="text-3xl font-bold text-gray-800 mb-3">{post.title}</h2>
//                     <p className="text-gray-700">{post.description}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



export default function PostDetails() {
    const { id } = useParams();
    const [posti, setPosts] = useState([])

    console.log("ididi",id);
    
    //  posts1.forEach(post => console.log("Post ID:", post.id));
    useEffect(() => {
        getPost()
    }, [])
    
    const getPost = async() => {
      try {
          const response = await axios.get('http://localhost:3004/api/posts/'+id);
          setPosts(response.data);
         
      } catch (error) {
          console.error('Une erreur s\'est produite lors de la récupération des articles:', error);
          // Gérer l'erreur, par exemple en affichant un message à l'utilisateur ou en journalisant l'erreur pour le débogage
      }
    }
     console.log("posti",posti);
    if (!posti) {
        return <div>Aucun post trouvé</div>;
    }

    return (
        <div className="container mx-auto mt-12">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {posti.image && (
                <img src={posti.image.url} alt={posti.title} className="w-full h-48 object-cover" />
              )}
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">{posti.title}</h2>
                    <div className="flex items-center mb-4">
                        <img className="w-10 h-10 rounded-full mr-4" src={posti.authorLogo} alt={posti.authorName} />
                        <div>
                            <p className="text-gray-600">{posti.authorName}</p>
                            <p className="text-sm text-gray-500">{posti.date}</p>
                        </div>
                    </div>
                    <p className="text-gray-700">{posti.description}</p>
                </div>
            </div>
        </div>
    );
}
