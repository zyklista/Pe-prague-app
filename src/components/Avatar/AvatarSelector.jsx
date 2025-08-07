import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Star, Trophy, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';
import { avatarOptions } from '../../store/demoData';

const AvatarSelector = ({ isOpen, onClose }) => {
  const { avatar, setCurrentAvatar, unlockAvatar, addPoints } = useStore();
  const [selectedAvatar, setSelectedAvatar] = useState(avatar.currentAvatar);

  const handleAvatarSelect = (avatarId) => {
    const avatarOption = avatarOptions.find(a => a.id === avatarId);
    
    if (avatar.unlockedAvatars.includes(avatarId)) {
      setCurrentAvatar(avatarId);
      setSelectedAvatar(avatarId);
      toast.success(`Avatar changed to ${avatarOption.name}!`);
    } else if (avatar.level >= avatarOption.requiredLevel) {
      // Unlock the avatar
      unlockAvatar(avatarId);
      setCurrentAvatar(avatarId);
      setSelectedAvatar(avatarId);
      toast.success(`${avatarOption.name} unlocked and equipped!`);
    } else {
      toast.error(`Reach level ${avatarOption.requiredLevel} to unlock this avatar`);
    }
  };

  const AvatarCard = ({ avatarOption, index }) => {
    const isUnlocked = avatar.unlockedAvatars.includes(avatarOption.id);
    const canUnlock = avatar.level >= avatarOption.requiredLevel;
    const isSelected = selectedAvatar === avatarOption.id;
    const isLocked = !isUnlocked && !canUnlock;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
          isSelected 
            ? 'border-primary-500 bg-primary-50' 
            : isLocked
            ? 'border-gray-200 bg-gray-50'
            : 'border-gray-300 bg-white hover:border-primary-300'
        }`}
        onClick={() => handleAvatarSelect(avatarOption.id)}
        whileHover={{ scale: isLocked ? 1 : 1.05 }}
        whileTap={{ scale: isLocked ? 1 : 0.95 }}
      >
        {/* Avatar Display */}
        <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-3xl ${
          isLocked ? 'grayscale opacity-50' : ''
        }`}>
          {isLocked ? (
            <div className="relative">
              <span className="opacity-30">{avatarOption.emoji}</span>
              <Lock 
                className="absolute inset-0 m-auto text-gray-400" 
                size={20} 
              />
            </div>
          ) : (
            avatarOption.emoji
          )}
        </div>

        {/* Avatar Name */}
        <h3 className={`text-center font-bold mb-1 ${
          isLocked ? 'text-gray-400' : 'text-gray-800'
        }`}>
          {avatarOption.name}
        </h3>

        {/* Level Requirement */}
        <p className={`text-xs text-center mb-2 ${
          isLocked ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Level {avatarOption.requiredLevel}
        </p>

        {/* Status Indicators */}
        <div className="flex justify-center">
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-primary-500 text-white rounded-full px-2 py-1 text-xs font-bold flex items-center gap-1"
            >
              <Star size={12} />
              Equipped
            </motion.div>
          )}
          
          {!isUnlocked && canUnlock && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-yellow-500 text-white rounded-full px-2 py-1 text-xs font-bold flex items-center gap-1"
            >
              <Sparkles size={12} />
              Available
            </motion.div>
          )}
          
          {isLocked && (
            <div className="bg-gray-300 text-gray-600 rounded-full px-2 py-1 text-xs font-bold flex items-center gap-1">
              <Lock size={12} />
              Locked
            </div>
          )}
        </div>

        {/* Unlock Animation */}
        {!isUnlocked && canUnlock && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-full h-full border-2 border-yellow-400 rounded-2xl"></div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Choose Your Avatar</h2>
                <p className="opacity-90">
                  Level {avatar.level} • {avatar.points} points
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Current Stats */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Your Progress</h3>
              <div className="flex items-center gap-2 text-yellow-600">
                <Trophy size={20} />
                <span className="font-bold">{avatar.achievements.length} achievements</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(avatar.points % 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              {100 - (avatar.points % 100)} points until level {avatar.level + 1}
            </p>
          </div>

          {/* Avatar Grid */}
          <div className="p-6 max-h-[50vh] overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {avatarOptions.map((avatarOption, index) => (
                <AvatarCard
                  key={avatarOption.id}
                  avatarOption={avatarOption}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p>💡 <strong>Tip:</strong> Complete challenges and chat regularly to level up faster!</p>
              </div>
              <motion.button
                onClick={onClose}
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Done
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AvatarSelector;