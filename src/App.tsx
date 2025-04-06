import { Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import UserPage from './Pages/UserPage';
import SocialShare from './Pages/SocialShare';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:userid" element={<UserPage />} />
        <Route path="/share" element={<SocialShare />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
export default App