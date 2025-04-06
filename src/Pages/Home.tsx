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
        <div className="min-vh-100 bg-gradient-primary d-flex align-items-center">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card shadow-lg border-0 rounded-3">
                            <div className="card-body p-5">
                                <h1 className="text-center mb-4 display-4 fw-bold text-gradient">
                                    🔥 RoastForce 🔥
                                </h1>

                                {error && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        {error}
                                        <button type="button" className="btn-close" onClick={() => setError('')} />
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="mb-4">
                                    <div className="input-group input-group-lg">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg border-end-0"
                                            value={input}
                                            onChange={handleInputChange}
                                            placeholder="Enter Codeforces handle..."
                                            required
                                            disabled={isLoading}
                                        />
                                        <button 
                                            type="submit" 
                                            className="btn btn-danger btn-lg px-5"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" />
                                                    Roasting...
                                                </>
                                            ) : (
                                                'Generate Roast 🔥'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;