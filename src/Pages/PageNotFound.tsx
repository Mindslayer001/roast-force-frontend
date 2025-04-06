import { useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container flex-center">
      <div className="container">
        <div className="roast-header text-center">
          <h1 className="text-gradient" style={{ fontSize: '6rem' }}>404</h1>
          <h2 className="text-gradient mb-4">
            Page Not Found (Unlike your bugs)
          </h2>
          <p className="lead text-muted mb-5">
            The page you're looking for has been moved, <br />
            deleted, or never existed. <br />
            Just like your last AC submission.
          </p>
          <button
            onClick={() => navigate('/')}
            className="roast-button"
          >
            ↩️ Back to Safety
          </button>
        </div>

        <div className="pro-tip">
          <p>Pro tip: Double-check URLs like you double-check edge cases 🧠</p>
        </div>
      </div>
    </div>
  );
};