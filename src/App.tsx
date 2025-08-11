import React, { useState } from 'react';
import { Play } from 'lucide-react';

export default function App() {
  const [selectedTab, setSelectedTab] = useState<'discord' | 'robux'>('discord');
  const [selectedReward, setSelectedReward] = useState<string>('');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [videoLiked, setVideoLiked] = useState(false);
  const [channelSubscribed, setChannelSubscribed] = useState(false);
  const [commentText, setCommentText] = useState('');

  const rewards = {
    discord: [
      { id: '1', name: 'Nitro Basic', code: 'DISCORD-NITRO-1234' },
      { id: '2', name: 'Nitro Classic', code: 'DISCORD-CLASSIC-5678' },
    ],
    robux: [
      { id: '3', name: '100 Robux', code: 'ROBUX-100-9876' },
      { id: '4', name: '500 Robux', code: 'ROBUX-500-5432' },
    ],
  };

  const openYouTubeVideo = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  const handleLikeVideo = () => {
    setVideoLiked(true);
  };

  const handleSubscribeChannel = () => {
    setChannelSubscribed(true);
  };

  const handleVerificationComplete = () => {
    if (videoLiked && channelSubscribed && commentText.trim() !== '') {
      setShowVerificationModal(false);
      setShowCodeModal(true);
    } else {
      alert('Please complete all verification steps.');
    }
  };

  const handleSkipVerification = () => {
    setShowVerificationModal(false);
    setShowCodeModal(true);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Reward System</h1>
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              selectedTab === 'discord' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSelectedTab('discord')}
          >
            Discord
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              selectedTab === 'robux' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSelectedTab('robux')}
          >
            Robux
          </button>
        </div>

        <div className="space-y-3">
          {rewards[selectedTab].map((reward) => (
            <div
              key={reward.id}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedReward === reward.id ? 'border-blue-500' : 'border-gray-300'
              }`}
              onClick={() => {
                setSelectedReward(reward.id);
                setShowVerificationModal(true);
              }}
            >
              {reward.name}
            </div>
          ))}
        </div>
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Verification Required</h2>
            <p className="mb-4">
              Please like the video, subscribe to the channel, and comment "Nice video" to continue.
            </p>

            <div className="flex gap-3 mb-4">
              <button
                onClick={openYouTubeVideo}
                className="px-3 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2"
              >
                <Play size={16} /> Open Video
              </button>
              <button
                onClick={handleLikeVideo}
                className={`px-3 py-2 rounded-lg ${
                  videoLiked ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}
              >
                {videoLiked ? 'Liked' : 'Like Video'}
              </button>
              <button
                onClick={handleSubscribeChannel}
                className={`px-3 py-2 rounded-lg ${
                  channelSubscribed ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}
              >
                {channelSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>

            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Enter your comment"
              className="w-full border p-2 rounded-lg mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={handleVerificationComplete}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Verify
              </button>

              <button
                onClick={handleSkipVerification}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                Skip Verification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
            <h2 className="text-xl font-bold mb-4">Your Reward Code</h2>
            <p className="mb-4 text-lg">
              {rewards[selectedTab].find((r) => r.id === selectedReward)?.code}
            </p>
            <button
              onClick={() =>
                handleCopyCode(rewards[selectedTab].find((r) => r.id === selectedReward)?.code || '')
              }
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              {codeCopied ? 'Copied!' : 'Copy Code'}
            </button>
            <button
              onClick={() => setShowCodeModal(false)}
              className="ml-3 px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
