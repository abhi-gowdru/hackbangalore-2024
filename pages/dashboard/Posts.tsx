import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                setError(error.message);
                console.error('There was an error!', error);
            });
    }, []);

    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;
