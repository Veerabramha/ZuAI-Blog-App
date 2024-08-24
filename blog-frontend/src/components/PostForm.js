import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function PostForm({ match }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();
  const isEditing = Boolean(match.params.id);

  useEffect(() => {
    if (isEditing) {
      fetch(`http://localhost:5000/posts/${match.params.id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.data.title);
          setContent(data.data.content);
        })
        .catch(err => console.error(err));
    }
  }, [isEditing, match.params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:5000/posts/${match.params.id}`
      : 'http://localhost:5000/posts';

    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
      .then(() => history.push('/'))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>{isEditing ? 'Edit Post' : 'New Post'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default PostForm;
