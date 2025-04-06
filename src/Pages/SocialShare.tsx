import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import RoastCard from '../Components/RoastCard';
import { UserDetails } from '../@Types/UserDetails';

const SocialShare: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as UserDetails | undefined;
  const cardRef = useRef<HTMLDivElement>(null);

  if (!state) {
    return (
      <div className="container text-center mt-5">
        <h2 className="fw-semibold">Oops! Missing roast data 🥲</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  const { username, avatarUrl, postText, error } = state;

  const handleExport = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: window.devicePixelRatio,
      useCORS: true,
    });

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), 'image/png')
    );

    if (!blob) return;

    const file = new File([blob], `${username}_card.png`, { type: 'image/png' });

    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `${username}'s Post`,
          text: postText ?? '',
        });
      } catch (err) {
        console.error('Sharing failed:', err);
      }
    } else {
      alert('Sharing not supported. Downloading image instead.');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${username}_card.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="container py-5 d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1 className="display-4 text-center mb-4 text-primary">Share Your Roast</h1>

<div className="d-flex justify-content-center mb-4">
  <RoastCard
    ref={cardRef}
    username={username}
    avatarUrl={avatarUrl}
    postText={postText}
    error={error}
  />
</div>


      <div className="d-flex gap-3 flex-wrap justify-content-center">
        <button className="btn btn-warning btn-lg" onClick={handleExport}>
          {navigator.canShare?.() ? '📱 Share Card' : '⬇️ Download'}
        </button>
        <button className="btn btn-outline-primary btn-lg" onClick={() => navigate('/')}>
          🆕 New Roast
        </button>
      </div>

      <p className="text-muted text-center mt-4">
        Pro tip: Perfect for Twitter/X, Instagram, and Discord flexing 📱
      </p>
    </div>
  );
};

export default SocialShare;
