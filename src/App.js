import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './common/Header';
import Post from './features/post/Post';
import PostList from './features/post/PostList';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/posts/all" element={<PostList />} />
            <Route path="/posts/:postId" element={<Post />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
