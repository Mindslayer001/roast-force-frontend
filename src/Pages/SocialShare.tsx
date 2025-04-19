import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import RoastCard from '../Components/RoastCard';
import { UserDetails } from '../@Types/UserDetails';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { browserSupport } from '../utils/browserSupport';

const SocialShare: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as UserDetails | undefined;
  const cardRef = useRef<HTMLDivElement>(null);
  const [shareCount, setShareCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fallback download function for browsers without share API
  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
      if (browserSupport.downloadSupport()) {
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `roast-${state?.username || 'card'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Fallback for older browsers
        window.open(generatedImage, '_blank');
      }
      celebrateShare();
    } catch (err) {
      setError('Failed to download image. Please try again.');
    }
  };

  // Enhanced share function with fallbacks
  const handleShare = async () => {
    if (!generatedImage) return;

    try {
      if (browserSupport.canShare()) {
        const file = await fetch(generatedImage)
          .then(res => res.blob())
          .then(blob => new File([blob], `roast-${state?.username || 'card'}.png`, { type: 'image/png' }));

        const shareData = {
          title: '🔥 Check out this roast!',
          text: 'Generated with RoastForce - Where code meets comedy!',
          files: [file],
          url: window.location.origin
        };

        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          celebrateShare();
          return;
        }
      }
      // Fallback to download
      await handleDownload();
    } catch (err) {
      console.error('Share failed:', err);
      await handleDownload();
    }
  };

  const generateCardImage = async () => {
    if (!cardRef.current || !browserSupport.canvasSupport()) {
      setError('Your browser doesn\'t support image generation.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Pre-load avatar image if exists
      if (state?.avatarUrl) {
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = resolve;
          img.onerror = reject;
          img.src = state?.avatarUrl ??"";
        });
      }

      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: window.devicePixelRatio * 2, // Better quality on high-DPI displays
        logging: false,
        onclone: (clonedDoc) => {
          const images = clonedDoc.getElementsByTagName('img');
          Array.from(images).forEach(img => {
            img.crossOrigin = "anonymous";
          });
        }
      });

      const dataUrl = canvas.toDataURL('image/png');
      setGeneratedImage(dataUrl);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (state && !generatedImage) {
      generateCardImage();
    }
  }, [state, generatedImage]);

  // Error state UI
  if (!state) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container px-4 py-5 text-center"
      >
        <h2 className="fw-semibold mb-4">Bruh! Where's the roast?</h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          Go Cook Something Spicy! 🌶️
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container px-4 py-5"
    >
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <motion.h1 
            className="display-4 text-center mb-4 fw-bold"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Your Spicy Roast is Ready! 🔥
          </motion.h1>

          {/* Hidden RoastCard */}
          <div className="visually-hidden">
            <RoastCard
              ref={cardRef}
              username={state.username}
              avatarUrl={state.avatarUrl}
              postText={state.postText}
              timer={state.timer}
              new_user={state.new_user}
              error={state.error}
            />
          </div>

          {/* Main content */}
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            {error && (
              <div className="alert alert-danger m-3">
                {error}
              </div>
            )}

            <div className="card-body p-4">
              {isGenerating ? (
                <div className="text-center p-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Cooking up your roast...</p>
                </div>
              ) : generatedImage && (
                <img 
                  src={generatedImage}
                  alt="Your Roast Card"
                  className="img-fluid rounded-3 shadow-sm"
                  style={{ width: '100%', height: 'auto' }}
                />
              )}

              {/* Action buttons */}
              <div className="d-grid gap-2 d-sm-flex justify-content-center mt-4">
                <motion.button 
                  className="btn btn-primary btn-lg px-4 gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  disabled={isGenerating}
                >
                  {browserSupport.canShare() ? '🔥 Share' : '⬇️ Download'}
                </motion.button>
                <motion.button 
                  className="btn btn-outline-secondary btn-lg px-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                >
                  🌶️ Cook Another
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialShare;
function celebrateShare() {
  throw new Error('Function not implemented.');
}

