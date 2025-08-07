import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Globe, 
  Volume2, 
  Shield, 
  User, 
  Save,
  TestTube,
  Lock,
  Unlock,
  Bell
} from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';
import TTSService from '../../services/TTSService';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { 
    settings, 
    updateSettings, 
    userRole, 
    user,
    checkTutorTime 
  } = useStore();

  const [localSettings, setLocalSettings] = useState({ ...settings });
  const [isTestingVoice, setIsTestingVoice] = useState(false);
  const [adultPassword, setAdultPassword] = useState('');
  const [showAdultLogin, setShowAdultLogin] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'tl', name: 'Tagalog', flag: '🇵🇭' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const handleSettingChange = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    try {
      updateSettings(localSettings);
      
      // Update language immediately
      if (localSettings.language !== settings.language) {
        i18n.changeLanguage(localSettings.language);
      }
      
      // Check tutor time if time settings changed
      if (localSettings.tutorTimeStart !== settings.tutorTimeStart || 
          localSettings.tutorTimeEnd !== settings.tutorTimeEnd) {
        setTimeout(checkTutorTime, 100);
      }
      
      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    }
  };

  const handleTestVoice = async () => {
    setIsTestingVoice(true);
    try {
      const success = await TTSService.testVoice(localSettings.language);
      if (success) {
        toast.success('Voice test completed!');
      } else {
        toast.error('Voice test failed');
      }
    } catch (error) {
      console.error('Voice test error:', error);
      toast.error('Could not test voice');
    } finally {
      setIsTestingVoice(false);
    }
  };

  const handleAdultModeToggle = () => {
    if (localSettings.adultModeEnabled) {
      // Disable adult mode
      handleSettingChange('adultModeEnabled', false);
      setShowAdultLogin(false);
    } else {
      // Show password prompt
      setShowAdultLogin(true);
    }
  };

  const handleAdultLogin = () => {
    // Simple password check (in production, this would be more secure)
    if (adultPassword === 'admin123' || adultPassword === user?.guardianName?.toLowerCase()) {
      handleSettingChange('adultModeEnabled', true);
      setShowAdultLogin(false);
      setAdultPassword('');
      toast.success('Adult mode enabled');
    } else {
      toast.error('Incorrect password');
      setAdultPassword('');
    }
  };

  const SettingCard = ({ icon: Icon, title, children, requiresAdult = false }) => {
    const isDisabled = requiresAdult && userRole === 'child' && !localSettings.adultModeEnabled;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`card ${isDisabled ? 'opacity-60' : ''}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center">
            <Icon className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            {requiresAdult && userRole === 'child' && (
              <p className="text-xs text-yellow-600 flex items-center gap-1">
                <Lock size={12} />
                Guardian access required
              </p>
            )}
          </div>
        </div>
        <div className={isDisabled ? 'pointer-events-none' : ''}>
          {children}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 font-child-friendly mb-2">
          {t('settings.title')}
        </h1>
        <p className="text-gray-600">
          Customize your AI tutor experience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Settings */}
        <SettingCard 
          icon={Clock} 
          title={t('settings.tutorTime')}
          requiresAdult={true}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('settings.startTime')}
              </label>
              <input
                type="time"
                value={localSettings.tutorTimeStart}
                onChange={(e) => handleSettingChange('tutorTimeStart', e.target.value)}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('settings.endTime')}
              </label>
              <input
                type="time"
                value={localSettings.tutorTimeEnd}
                onChange={(e) => handleSettingChange('tutorTimeEnd', e.target.value)}
                className="input-field"
              />
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <Bell className="inline mr-1" size={14} />
                Chat will only be available during these hours
              </p>
            </div>
          </div>
        </SettingCard>

        {/* Language Settings */}
        <SettingCard icon={Globe} title={t('settings.language')}>
          <div className="space-y-3">
            {languages.map(lang => (
              <motion.button
                key={lang.code}
                onClick={() => handleSettingChange('language', lang.code)}
                className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                  localSettings.language === lang.code
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-semibold">{lang.name}</span>
                  {localSettings.language === lang.code && (
                    <span className="ml-auto text-primary-600">✓</span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </SettingCard>

        {/* Voice Settings */}
        <SettingCard icon={Volume2} title="Voice Settings">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Enable Voice</p>
                <p className="text-sm text-gray-600">AI responses will be read aloud</p>
              </div>
              <button
                onClick={() => handleSettingChange('voiceEnabled', !localSettings.voiceEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  localSettings.voiceEnabled ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  localSettings.voiceEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            
            <motion.button
              onClick={handleTestVoice}
              disabled={isTestingVoice}
              className="w-full btn-secondary flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <TestTube size={20} />
              {isTestingVoice ? 'Testing...' : 'Test Voice'}
            </motion.button>
          </div>
        </SettingCard>

        {/* Safety & Privacy */}
        <SettingCard icon={Shield} title="Safety & Privacy">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Child Safety Mode</p>
                <p className="text-sm text-gray-600">Extra content filtering enabled</p>
              </div>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-800">
                <Shield className="inline mr-1" size={14} />
                All conversations are filtered for age-appropriate content
              </p>
            </div>
          </div>
        </SettingCard>

        {/* Adult Mode */}
        <SettingCard icon={User} title={t('settings.adultMode')}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Adult Access</p>
                <p className="text-sm text-gray-600">
                  {localSettings.adultModeEnabled ? 'Full access enabled' : 'Child restrictions active'}
                </p>
              </div>
              <button
                onClick={handleAdultModeToggle}
                className={`w-12 h-6 rounded-full transition-colors ${
                  localSettings.adultModeEnabled ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  localSettings.adultModeEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            
            {localSettings.adultModeEnabled && (
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm text-orange-800">
                  <Unlock className="inline mr-1" size={14} />
                  Adult mode is currently active
                </p>
              </div>
            )}
          </div>
        </SettingCard>

        {/* Account Info */}
        <SettingCard icon={User} title="Account Information">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-700">Child Name</p>
              <p className="text-gray-800">{user?.childName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">Guardian Name</p>
              <p className="text-gray-800">{user?.guardianName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">Current Mode</p>
              <p className="text-gray-800 capitalize">{userRole}</p>
            </div>
          </div>
        </SettingCard>
      </div>

      {/* Adult Password Modal */}
      {showAdultLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Adult Access Required
            </h3>
            <p className="text-gray-600 mb-4">
              Enter the guardian password to enable adult mode:
            </p>
            
            <input
              type="password"
              value={adultPassword}
              onChange={(e) => setAdultPassword(e.target.value)}
              placeholder="Guardian password"
              className="input-field mb-4"
              onKeyPress={(e) => e.key === 'Enter' && handleAdultLogin()}
            />
            
            <div className="flex gap-3">
              <button
                onClick={handleAdultLogin}
                className="btn-primary flex-1"
              >
                Unlock
              </button>
              <button
                onClick={() => {
                  setShowAdultLogin(false);
                  setAdultPassword('');
                }}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-3 text-center">
              Hint: Try "admin123" or the guardian's name
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 text-center"
      >
        <motion.button
          onClick={handleSaveSettings}
          className="btn-primary px-8 py-3 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Save className="mr-2" size={20} />
          Save Settings
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Settings;