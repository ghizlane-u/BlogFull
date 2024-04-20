import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function BlogPosts({}) {
   
    
    const [post, setPosts] = useState([])
    console.log('post1',post);
    useEffect(() => {
        getPost()
    }, [])

    const getPost = async() => {
        try {
            const response = await axios.get('http://localhost:3004/api/posts');
            setPosts(response.data);
            console.log('post _id',post[1]._id)
           
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des articles:', error);
            // Gérer l'erreur, par exemple en affichant un message à l'utilisateur ou en journalisant l'erreur pour le débogage
        }
    } 
    if (!post || !Array.isArray(post) || post.length === 0) {
        return (
          <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
            <div className="text-center">
              <p className="text-gray-500">No posts available</p>
            </div>
          </section>
        );
      }
    
    return (
        <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
            <div className="text-center">
                <h1 className="text-3xl text-gray-800 font-semibold">
                    Blog
                </h1>
                <p className="mt-3 text-gray-500">
                    This blog shares insights, stories, and tips on various topics ranging from technology to lifestyle. Here, you can find articles that inspire, educate, and entertain. Whether you're looking for advice on your next tech project, tips for your health and well-being, or just a good read to relax, you've come to the right place. Dive in to explore the content that interests you the most.
                </p>
            </div>
            <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {post.map((post) => (
                        console.log('fgfghfgfgg', post.id),
                    <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm" key={post.id}>
                        <div>
                        {post.image && (
                <img src={post.image.url} alt={post.title} className="w-full h-48 object-cover" />
              )}   <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                                {/* <div className="flex-none w-10 h-10 rounded-full">
                                    <img src={post.authorLogo} className="w-full h-full rounded-full" alt={post.authorName} />
                                </div> */}
                                <div className="ml-3">
                                    {/* <span className="block text-gray-900">{post.authorName}</span> */}
                                    <span className="block text-gray-400 text-sm">{post.date}</span>
                                </div>
                            </div>
                            <div className="pt-3 ml-4 mr-2 mb-3">
                                <h3 className="text-xl text-gray-900">
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 text-sm mt-1">{post.description.substring(0, 100)}...</p>
                            </div>
                        </div>
                        <div className="text-center mb-3">
                            <Link to={`/post-details/${post.id}`} className="text-blue-500">View more</Link>
                           
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
} 