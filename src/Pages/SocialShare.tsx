import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserDetails } from '../@Types/UserDetails';
import html2canvas from 'html2canvas';

const SocialShare: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as UserDetails | undefined;

  if (!state) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-lg font-semibold">Oops! Missing roast data 🥲</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const { username, postText, avatarUrl } = state;
  const cardRef = useRef<HTMLDivElement>(null);

  const captureCard = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current);
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
      alert("Sharing blob is not supported in your browsers. Please download it and share it manually.")
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
    <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-gray-100">
      <div
        ref={cardRef}
        className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center"
      >
        <img
          src={avatarUrl ?? ''}
          alt="User Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
        <h2 className="text-xl font-semibold">{username}</h2>
        <p className="text-gray-600 mt-2">{postText}</p>
      </div>

      <button
        onClick={captureCard}
        className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        {navigator.canShare?.({ files: [new File([], '')] }) ? 'Share on Social' : 'Download Image'}
      </button>
    </div>
  );
};

export default SocialShare;
