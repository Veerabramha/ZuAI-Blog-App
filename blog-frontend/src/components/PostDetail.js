import React, { useState, useEffect } from 'react';

function PostDetail({ match }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${match.params.id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [match.params.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetail;
