import {useRef} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import IAmJustARat from './../assets/I_am_just_a_rat.png';
import { UserDetails } from '../@Types/UserDetails';
import CountdownTimer from '../Components/CountdownTimer';
import '../styles/CountdownTimer.css';

const UserPage = () => {
  const responseContentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as UserDetails | undefined;

  if (!state) {
    return (
      <div className="home-container flex-center">
        <div className="container">
          <div className="roast-header">
            <h2 className="text-gradient">⚠️ Missing Roast Data</h2>
            <button 
              onClick={() => navigate('/')}
              className="roast-button"
            >
              ↩️ Back to Roaster
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { username, postText, avatarUrl, timer, error } = state;

  console.log('UserPage state:', state);

  const handleShare = () => {
    navigate('/share', { state: { username, postText, avatarUrl, error } });
  };

  return (
    <div className="home-container flex-center">
      <div className="container">
        <div className="roast-header">
          <h1 className="roast-title text-gradient">
            {error ? 'Compilation Error 😢' : 'Roast Results 🍗'}
          </h1>
          
          <div className="user-card">
            {error ? (
              <div className="text-center">
                <img 
                  src={IAmJustARat} 
                  className="user-avatar border-danger"
                  style={{ maxWidth: '200px' }}
                  alt="Error illustration"
                />
                <div className="alert alert-danger mt-4">
                  <strong>CE:</strong><p>Please Contact the developer <a href="https://x.com/ismycodeshit">IsMyCodeShit</a> in X</p>
                </div>
                <button 
                  onClick={() => navigate('/')}
                  className="roast-button"
                >
                  ↩️ Try Again (Maybe AC next time?)
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-4">
                  <img
                    src={avatarUrl || 'https://via.placeholder.com/150/333333/cccccc?text=CF'}
                    className="user-avatar"
                    alt="User avatar"
                  />
                  <h2 className="text-gradient mt-3">
                    {username || "Anonymous Coder"}
                    <small className="d-block mt-2 fs-6 text-muted">(Rating: 100% unoriginal)</small>
                  </h2>
                </div>

                <div 
                  ref={responseContentRef}
                  className="roast-summary"
                  style={{ minHeight: '200px', maxHeight: '400px' }}
                >
                  <p className="lead text-white-50">
                    {postText || "Your roast is compiling... (jk, we're not that fast)"}
                  </p>
                </div>

                {postText && (
                  <div className="input-group">
                    <button 
                      onClick={handleShare}
                      className="roast-button"
                    >
                      📢 Share Your Roast 
                      <span className="ms-2">(Flex responsibly)</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {timer ? (
            <div className="pro-tip">
              <p>
                Time until next roast: <CountdownTimer targetDate={timer} />
              </p>
              <p>Pro tip: {error ? 'Check your handle spelling!' : 'Sign up to have zero countdown'}</p>
            </div>
        ) : (
          <div className="pro-tip">
            <p>Pro tip: {error ? 'Check your handle spelling!' : 'Share your roast to establish dominance 💪'}</p>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default UserPage;