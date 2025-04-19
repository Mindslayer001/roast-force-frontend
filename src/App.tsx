import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import UserPage from './Pages/UserPage';
import SocialShare from './Pages/SocialShare';
import {PageNotFound} from './Pages/PageNotFound';
import SubscribePage from './Pages/demo';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:userid" element={<UserPage />} />
        <Route path="/share" element={<SocialShare />} />
        <Route path="/sub" element={<SubscribePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
export default App