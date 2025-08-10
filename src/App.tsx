import React, { useState } from 'react';
import { Gift, Copy, Check, ExternalLink, Sparkles, Wrench, AlertTriangle } from 'lucide-react';

interface RewardOption {
  id: string;
  type: 'discord' | 'robux';
  title: string;
  description: string;
  value: string;
  icon: string;
  gradient: string;
  selected?: boolean;
}

function App() {
  const [selectedTab, setSelectedTab] = useState<'discord' | 'robux'>('discord');
  const [selectedReward, setSelectedReward] = useState<string>('');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const discordRewards: RewardOption[] = [
    {
      id: 'nitro-basic',
      type: 'discord',
      title: 'Nitro Basic',
      description: 'Custom emojis & stickers',
      value: '1 Month',
      icon: '🌟',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 'nitro-boost',
      type: 'discord',
      title: 'Nitro Boost',
      description: 'All features + HD streaming',
      value: '1 Month',
      icon: '💎',
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  const robuxRewards: RewardOption[] = [
    {
      id: 'robux-450',
      type: 'robux',
      title: '450 Robux',
      description: 'Perfect for avatar items',
      value: '450',
      icon: '🏆',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'robux-1500',
      type: 'robux',
      title: '1,500 Robux',
      description: 'Premium avatar upgrades',
      value: '1,500',
      icon: '👑',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'robux-4500',
      type: 'robux',
      title: '4,500 Robux',
      description: 'Ultimate gaming experience',
      value: '4,500',
      icon: '🚀',
      gradient: 'from-green-500 to-teal-600'
    }
  ];

  const handleRewardSelect = (rewardId: string) => {
    setSelectedReward(rewardId);
  };

  const handleClaimReward = async () => {
    if (!selectedReward) return;
    
    setMaintenanceMode(true);
  };

  const copyDiscordCode = async () => {
    await navigator.clipboard.writeText('discord.gift/vhfihv54geh');
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const copyRobuxCode = async () => {
    await navigator.clipboard.writeText('RBX1-7HSB63-117HH');
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const openDiscordGift = () => {
    window.open('https://discord.gift/vhfihv54geh', '_blank');
  };

  const currentRewards = selectedTab === 'discord' ? discordRewards : robuxRewards;
  const selectedRewardData = currentRewards.find(reward => reward.id === selectedReward);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fill-opacity%3D%220.03%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-pulse delay-2000"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Claim Your Reward
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2 text-purple-200">
              <Sparkles className="w-4 h-4" />
              <p className="text-lg">Choose your premium reward</p>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
            {/* Tab Switcher */}
            <div className="flex bg-black/20 rounded-2xl p-1 mb-6">
              <button
                onClick={() => {
                  setSelectedTab('discord');
                  setSelectedReward('');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  selectedTab === 'discord'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl">💜</span>
                Discord Nitro
              </button>
              <button
                onClick={() => {
                  setSelectedTab('robux');
                  setSelectedReward('');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  selectedTab === 'robux'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl">💰</span>
                Robux
              </button>
            </div>

            {/* Reward Options */}
            <div className="space-y-4 mb-6">
              {currentRewards.map((reward) => (
                <div
                  key={reward.id}
                  onClick={() => handleRewardSelect(reward.id)}
                  className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedReward === reward.id
                      ? 'bg-gradient-to-r from-white/20 to-white/10 border-2 border-white/40 shadow-xl'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {selectedReward === reward.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl animate-pulse"></div>
                  )}
                  
                  <div className="relative flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${reward.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                      {reward.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {reward.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {reward.description}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${reward.gradient} bg-clip-text text-transparent`}>
                        {reward.value}
                      </div>
                      {reward.type === 'robux' && (
                        <div className="text-gray-400 text-sm">Robux</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Claim Button */}
            <button
              onClick={handleClaimReward}
              disabled={!selectedReward || isProcessing}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                selectedReward && !isProcessing
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                `✨ Claim ${selectedRewardData?.title || 'Reward'}`
              )}
            </button>

            <p className="text-center text-gray-400 text-sm mt-4">
              Select a reward above to continue
            </p>
          </div>
        </div>
      </div>

      {/* Maintenance Mode Modal */}
      {maintenanceMode && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Maintenance Mode
              </h2>
              <p className="text-gray-300">
                Our reward system is currently under maintenance. Please try again later.
              </p>
            </div>

            <div className="bg-orange-500/20 border border-orange-500/30 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 text-orange-200">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold mb-1">System Temporarily Unavailable</p>
                  <p>We're working to restore service as quickly as possible.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Estimated downtime: 30-60 minutes</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                <span className="text-sm">All rewards will be available after maintenance</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-700"></div>
                <span className="text-sm">Thank you for your patience</span>
              </div>
            </div>

            <button
              onClick={() => setMaintenanceMode(false)}
              className="w-full py-3 px-6 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 rounded-2xl text-white font-semibold transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Your Reward Code
              </h2>
              <p className="text-gray-300">
                Click to copy or redeem directly on Discord
              </p>
            </div>

            <div className="bg-black/30 rounded-2xl p-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-white mb-2 select-all">
                  {selectedTab === 'discord' ? 'discord.gift/vhfihv54geh' : 'RBX1-7HSB63-117HH'}
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={selectedTab === 'discord' ? copyDiscordCode : copyRobuxCode}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-200"
                  >
                    {codeCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {codeCopied ? 'Copied!' : 'Copy'}
                  </button>
                  {selectedTab === 'discord' && (
                    <button
                      onClick={openDiscordGift}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white transition-all duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Redeem
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Valid for 24 hours</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">No account required</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Instant activation</span>
              </div>
            </div>

            <button
              onClick={() => setShowCodeModal(false)}
              className="w-full py-3 px-6 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 rounded-2xl text-white font-semibold transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
