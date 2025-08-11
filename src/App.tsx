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
  const [videoCommented, setVideoCommented] = useState(false);
  const [commentText, setCommentText] = useState('');

  const rewards = {
    discord: ['Free Nitro 1 Month', 'Free Nitro 3 Months', 'Free Nitro 1 Year'],
    robux: ['100 Robux', '500 Robux', '1000 Robux']
  };

  const rewardCodes: Record<string, string> = {
    'Free Nitro 1 Month': 'NITRO1M-1234',
    'Free Nitro 3 Months': 'NITRO3M-5678',
    'Free Nitro 1 Year': 'NITRO1Y-9012',
    '100 Robux': 'ROBUX100-ABCD',
    '500 Robux': 'ROBUX500-EFGH',
    '1000 Robux': 'ROBUX1000-IJKL'
  };

  const handleRewardClick = (reward: string) => {
    setSelectedReward(reward);
    setShowVerificationModal(true);
  };

  const openYouTubeVideo = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  const handleLikeVideo = () => setVideoLiked(true);
  const handleSubscribeChannel = () => setChannelSubscribed(true);
  const handleCommentVideo = () => {
    if (commentText.trim() !== '') {
      setVideoCommented(true);
    }
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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(rewardCodes[selectedReward]);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Free Rewards</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSelectedTab('discord')}
            className={`px-4 py-2 rounded-lg ${selectedTab === 'discord' ? 'bg-blue-500' : 'bg-gray-700'}`}
          >
            Discord Nitro
          </button>
          <button
            onClick={() => setSelectedTab('robux')}
            className={`px-4 py-2 rounded-lg ${selectedTab === 'robux' ? 'bg-green-500' : 'bg-gray-700'}`}
          >
            Robux
          </button>
        </div>

        {/* Rewards List */}
        <div className="grid grid-cols-1 gap-4">
          {rewards[selectedTab].map((reward) => (
            <div
              key={reward}
              className="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
              onClick={() => handleRewardClick(reward)}
            >
              {reward}
            </div>
          ))}
        </div>
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-black">
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
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-black">
            <h2 className="text-xl font-bold mb-4">Your Reward Code</h2>
            <div className="p-4 bg-gray-200 rounded-lg font-mono text-lg mb-4">
              {rewardCodes[selectedReward]}
            </div>
            <button
              onClick={handleCopyCode}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              {codeCopied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
