import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserDetails } from '../@Types/UserDetails';
import LetHimCook from '../assets/let_him_cook.png';
import '../styles/Home.css';

const Home = () => {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);
        // console.log(import.meta.env.VITE_API_URL)
      try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: input }),
        });

        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        
        const responseData: UserDetails = await response.json();
        handleShare(responseData); // Use DIRECT response data
        
      } catch (err) {
        const message = err instanceof Error ? err.message : "Request failed";
        const errorData: UserDetails = {
          username: null,
          postText: null,
          avatarUrl: null,
          timer: null,
          new_user: false,
          error: message
        };
        handleShare(errorData);
        
      } finally {
        setIsLoading(false);
      }
    };

    const handleShare = (shareData: UserDetails) => {
        navigate(`/user/${input}`, {
          state: {
            username: shareData.username || "",
            postText: shareData.postText || "",
            avatarUrl: shareData.avatarUrl || "",
            timer: shareData.timer || 0,
            new_user: shareData.new_user || false,
            error: shareData.error || ""
          },
        });
      };
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    };

  return (
    <div className="home-container flex-center">
      <div className="container">
        <div className="roast-header">
          <div className="text-gradient">🔥 Handle Roaster 3000 🔥</div>
          <h1 className="roast-title text-gradient">RoastForce</h1>

          {error && (
            <div className="error-message">
              <span className="">⚠️ {error} (typical rookie mistake)</span>
              <button 
                onClick={() => setError('')}
                className=""
              >
                ×
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="roast-form">
            <div className="input-group">
              <input
                type="text"
                className="roast-input"
                value={input}
                onChange={handleInputChange}
                placeholder="Enter CF handle..."
                required
                disabled={isLoading}
              />
              <button
                type="submit" 
                className="roast-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loading-wrapper">
                    <div className="loading-spinner" />
                    <span>Roasting...</span>
                  </div>
                ) : (
                  <>Generate Roast 🔥</>
                )}
              </button>
            </div>
          </form>

          <AnimatePresence>
            {isLoading && (
              <>
                {/* Blur Overlay */}
                <motion.div 
                  className="blur-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                
                {/* Loading Dialog */}
                <motion.div 
                  className="loading-dialog"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="loading-content">
                    <img 
                      src={LetHimCook} 
                      alt="Cooking..." 
                      className="cooking-image"
                      height={200}
                    />
                    <div className="cooking-text">
                      <h3 className="text-gradient">Please wait while we cook...</h3>
                      <p>Preparing your roast with extra spice! 🌶️</p>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          
          <Link to="/about" className="about-link">
            Want to More About RoastForce
          </Link>
        </div>
        
        <div className="pro-tip">
          <p><span className='span'>Pro tip:</span> Dont trust yourself copy paste your handle for maximum success</p>
        </div>
      </div>
    </div>
  );
};

export default Home;