import React, {useRef} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import IAmJustARat from './../assets/I_am_just_a_rat.png';
import { UserDetails } from '../@Types/UserDetails';
const UserPage = () => {
  const responseContentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as UserDetails | undefined;
  
    if (!state) {
      return (
        <div>
          <h2>Oops! Missing roast data 🥲</h2>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      );
    }

    const { username, postText, avatarUrl, error } = state;

    const handleShare = () => {
      navigate('/share', {
        state: {
          username: username,
          postText: postText,
          avatarUrl: avatarUrl,
          error : error
        },
      });
    };

    return (
        <div className="min-vh-100 bg-gradient-primary d-flex align-items-center">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card shadow-lg border-0 rounded-3">
                            <div className="card-body p-5">
                                {error ? (
                                    <div className="text-center">
                                        <h2 className="mb-4 text-danger">Oops! Something went wrong 😢</h2>
                                        <img 
                                            src={IAmJustARat} 
                                            className="img-fluid rounded-3 mb-4"
                                            style={{ maxWidth: '200px' }}
                                            alt="Error illustration"
                                        />
                                        <button 
                                            onClick={() => navigate('/')}
                                            className="btn btn-primary px-5 py-2"
                                        >
                                            ↩️ Try Again
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-center mb-4 display-5 fw-bold">
                                            🍗 Roast Summary
                                        </h3>
                                        <div 
                                            ref={responseContentRef}
                                            className="bg-light rounded-3 p-4 mb-4 shadow-sm"
                                            style={{ minHeight: '200px', maxHeight: '400px', overflowY: 'auto' }}
                                        >
                                            <p className="lead mb-0">{postText || "Your roast is cooking..."}</p>
                                        </div>
                                        {postText && (
                                            <button 
                                                onClick={handleShare}
                                                className="btn btn-success w-100 py-2 fw-bold"
                                            >
                                                📢 Share Your Roast
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;