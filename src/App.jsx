import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostDetail from './Pages/PostDetail';
import PostCreate from './Pages/PostCreate';
import PostUpdate from './Pages/PostUpdate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/posts/:slug" element={<PostDetail />} />
        <Route path="/posts/id/:id/edit" element={<PostUpdate />} />
        <Route path="/posts/create" element={<PostCreate />} />
      </Routes>
    </Router>
  );
}

export default App;
