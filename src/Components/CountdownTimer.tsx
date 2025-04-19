import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CountdownTimerProps } from '../@Types/CountDownProps';

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);
  
    useEffect(() => {
      const calculateTimeLeft = () => {
        const target = new Date(targetDate).getTime();
        const now = new Date().getTime();
        const difference = target - now;
        
        // If we've passed the target time, return 0
        return Math.max(Math.floor(difference / 1000), 0);
      };
  
      // Initial calculation
      setTimeLeft(calculateTimeLeft());
  
      // Update every second
      const timer = setInterval(() => {
        const remaining = calculateTimeLeft();
        setTimeLeft(remaining);
        
        // Clear interval when countdown reaches 0
        if (remaining <= 0) {
          clearInterval(timer);
        }
      }, 1000);
  
      // Cleanup on unmount
      return () => clearInterval(timer);
    }, [targetDate]);
  
    // Format time into minutes and seconds
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="countdown-timer"
      >
        <motion.span
          key={timeLeft}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {timeLeft > 0 ? (
            <span className={`timer ${timeLeft <= 10 ? 'timer-warning' : ''}`}>
              {formattedTime}
            </span>
          ) : (
            <span className="timer-complete">Ready! 🚀</span>
          )}
        </motion.span>
      </motion.span>
    );
  };
  
  export default CountdownTimer;