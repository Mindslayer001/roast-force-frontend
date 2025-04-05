import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { SocialPostGeneratorProps } from '../@Types/SocialMediaGeneratorProps';



const SocialPostGenerator: React.FC<SocialPostGeneratorProps> = ({ username, postText, avatarUrl }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "Test_Preset");

      const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL as string, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const imageUrl = data.secure_url;

      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}`);
    });
  };

  return (
    <div className="p-4">
      {/* Preview Card */}
      <div
        ref={previewRef}
        className="bg-white shadow-md rounded-xl p-4 max-w-lg flex gap-4 items-start"
      >
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-bold text-lg">@{username}</div>
          <div className="text-gray-800 whitespace-pre-wrap">{postText}</div>
        </div>
      </div>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Share to Twitter
      </button>
    </div>
  );
};

export default SocialPostGenerator;
