import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>My Blog</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/new">New Post</Link>
      </nav>
    </header>
  );
}

export default Header;
