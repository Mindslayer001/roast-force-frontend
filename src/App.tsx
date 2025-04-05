import { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import 'animate.css';
import './App.css';
import letHimCook from './assets/let_him_cook.png';
import IAmJustARat from './assets/I_am_just_a_rat.png'

function App() {
  const [input, setInput] = useState<string>("DmitriyH");
  const [responseText, setResponseText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const responseContentRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [errorField, setErrorField] = useState(false)
  const [formField, setFormField] = useState(true)

  const handleScrollDown = () => {
    if (responseContentRef.current) {
      responseContentRef.current.scrollBy({ top: 100, behavior: 'smooth' });
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    setResponseText("");
    setErrorField(false);
    setFormField(false);
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: input }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setResponseText(result.message);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Request failed";
      setResponseText("error");
      setErrorField(true)
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="container">
      <div className="roast-container">
        <h1 className="title animate__animated animate__rubberBand">
          🔥 RoastForce 🔥
        </h1>

        {formField ? <form onSubmit={handleSubmit} className="roast-form">
          <div className="input-group">
            <input
              type="text"
              className="roast-input"
              placeholder="Enter your Codeforces handle..."
              value={input}
              onChange={handleInputChange}
              required
            />
            <span className="input-highlight"></span>
          </div>

          <button 
            type="submit" 
            className="roast-button"
            disabled={isLoading}
          >
            {isLoading ? "Roasting..." : "Generate Roast"}
            <div className="button-hover"></div>
          </button>
        </form> : ""}

        {isLoading && (
          <div className="loading-indicator">
            <img src={letHimCook} alt="Let Him Cook" />
          </div>
        )}

        {errorField ?          
         <div className={'response-box active' }>
          <div className="response-header">
            <h3>Error Occurred Please Contact The Developer in X <a href="https://x.com/ismycodeshit" target='_blank'>IsMyCodeShit</a></h3>
          </div>
          <div className="response-content" ref={responseContentRef}>
            <img className="loading-indicator" src={IAmJustARat} alt='I am Just a Junior Developer'/>
          </div>
          {showScrollIndicator && (
            <button 
              className="scroll-indicator"
              onClick={handleScrollDown}
              aria-label="Scroll down"
            >
              ↓
            </button>
          )}
        </div> : <div className={`response-box ${responseText ? 'active' : ""}`}>
          <div className="response-header">
            <h3>Roast Summary</h3>
          </div>
          <div className="response-content" ref={responseContentRef}>
            {responseText || "Your personalized roast will appear here..."}
          </div>
        </div>

        }


          <div>
            <button 
              onClick={handleScrollDown}
              aria-label="Scroll down"
            >
              X (Twitter)
            </button>
            <button 
              onClick={handleScrollDown}
              aria-label="Scroll down"
            >
              Instagram
            </button>
            </div>
      </div>
    </div>
  );
}

export default App;