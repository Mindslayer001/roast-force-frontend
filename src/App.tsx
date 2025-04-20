import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import UserPage from './Pages/UserPage';
import SocialShare from './Pages/SocialShare';
import {PageNotFound} from './Pages/PageNotFound';
import About from './Pages/About';

import './App.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:userid" element={<UserPage />} />
        <Route path="/share" element={<SocialShare />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
  );
}

export default App;