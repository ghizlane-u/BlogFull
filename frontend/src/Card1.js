import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PostDetails() {
    const location = useLocation();
    const { post } = location.state;

    return (
        <div className="container mx-auto mt-12">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <img className="w-full h-64 object-cover object-center" src={post.img} alt={post.title} />
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">{post.title}</h2>
                    <div className="flex items-center mb-4">
                        <img className="w-10 h-10 rounded-full mr-4" src={post.authorLogo} alt={post.authorName} />
                        <div>
                            <p className="text-gray-600">{post.authorName}</p>
                            <p className="text-sm text-gray-500">{post.date}</p>
                        </div>
                    </div>
                    <p className="text-gray-700">{post.desc}</p>
                </div>
            </div>
        </div>
    );
}
