import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route path="/posts/:id" component={PostDetail} />
        <Route path="/new" component={PostForm} />
        <Route path="/edit/:id" component={PostForm} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
