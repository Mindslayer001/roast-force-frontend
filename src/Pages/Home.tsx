 import { useState, FormEvent, ChangeEvent } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { UserDetails } from '../@Types/UserDetails';

const Home = () => {
    const [input, setInput] = useState("DmitriyH");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);
        
      try {
        const response = await fetch('http://localhost:5000/api/submit', {
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
          username: "",
          postText: "",
          avatarUrl: "",
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
                                  <div className="">
                                      <div className="" />
                                      <span>Roasting...</span>
                                  </div>
                              ) : (
                                  <>
                                      Generate Roast 
                                      <span className="">🔥</span>
                                      <div className="" />
                                  </>
                              )}
                          </button>
                      </div>
                  </form>
              </div>
              
              <div className="pro-tip">
                  <p>Pro tip: Enter your real handle for maximum roasting potential 😈</p>
              </div>
          </div>
      </div>
  );
};

export default Home;