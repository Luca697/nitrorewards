import { useState } from 'react';
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
      { name: '1 Month Discord Nitro', code: 'NITRO1M-CODE-1234' },
      { name: '1 Year Discord Nitro', code: 'NITRO1Y-CODE-5678' },
    ],
    robux: [
      { name: '800 Robux', code: 'ROBUX800-CODE-9999' },
      { name: '1700 Robux', code: 'ROBUX1700-CODE-8888' },
    ],
  };

  const handleRewardClick = (reward: string) => {
    setSelectedReward(reward);
    setShowVerificationModal(true);
  };

  const handleVerificationComplete = () => {
    if (videoLiked && channelSubscribed && commentText.trim()) {
      setShowVerificationModal(false);
      setShowCodeModal(true);
    } else {
      alert('Please complete all verification steps.');
    }
  };

  // NEW: Skip verification
  const handleSkipVerification = () => {
    setShowVerificationModal(false);
    setShowCodeModal(true);
  };

  const handleCopyCode = () => {
    const reward = rewards[selectedTab].find(r => r.name === selectedReward);
    if (reward) {
      navigator.clipboard.writeText(reward.code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  const openYouTubeVideo = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  const handleLikeVideo = () => setVideoLiked(true);
  const handleSubscribeChannel = () => setChannelSubscribed(true);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Free Rewards</h1>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedTab('discord')}
          className={`px-4 py-2 rounded-lg ${selectedTab === 'discord' ? 'bg-blue-500' : 'bg-gray-700'}`}
        >
          Discord
        </button>
        <button
          onClick={() => setSelectedTab('robux')}
          className={`px-4 py-2 rounded-lg ${selectedTab === 'robux' ? 'bg-green-500' : 'bg-gray-700'}`}
        >
          Robux
        </button>
      </div>

      <div className="grid gap-4 w-full max-w-md">
        {rewards[selectedTab].map((reward) => (
          <div
            key={reward.name}
            onClick={() => handleRewardClick(reward.name)}
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer"
          >
            {reward.name}
          </div>
        ))}
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Verification Required</h2>
            <p className="mb-4">
              Please like the video, subscribe to the channel, and comment to continue.
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

              {/* Skip Button */}
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
          <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Your Code</h2>
            <div className="bg-gray-200 p-3 rounded-lg flex justify-between items-center">
              <span>{rewards[selectedTab].find(r => r.name === selectedReward)?.code}</span>
              <button
                onClick={handleCopyCode}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg"
              >
                {codeCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <button
              onClick={() => setShowCodeModal(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
