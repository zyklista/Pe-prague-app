import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Home, 
  MessageCircle, 
  Settings, 
  History, 
  LogOut,
  User
} from 'lucide-react';
import useStore from '../../store/useStore';
import AvatarSelector from '../Avatar/AvatarSelector';
import { avatarOptions } from '../../store/demoData';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { user, userRole, avatar, logout } = useStore();
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                <span className="text-xl">🎓</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 font-child-friendly">
                  AI Tutor Buddy
                </h1>
                <p className="text-xs text-gray-500">
                  Level {avatar.level} • {avatar.points} points
                </p>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <motion.button
                onClick={() => setShowAvatarSelector(true)}
                className="avatar-container hover:scale-110 transition-transform cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Change Avatar"
              >
                <span className="text-2xl">
                  {avatarOptions.find(a => a.id === avatar.currentAvatar)?.emoji || '👶'}
                </span>
              </motion.button>
              
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  {userRole === 'child' ? user?.childName : user?.guardianName}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {userRole} Mode
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-sm min-h-screen border-r border-gray-100">
          <div className="p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                      isActive(item.path)
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={20} />
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Avatar Progress */}
            <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">⭐</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {t('avatar.level', { level: avatar.level })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t('avatar.points', { points: avatar.points })}
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(avatar.points % 100)}%` }}
                ></div>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                {100 - (avatar.points % 100)} points to next level
              </p>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
      
      {/* Avatar Selector Modal */}
      <AvatarSelector 
        isOpen={showAvatarSelector} 
        onClose={() => setShowAvatarSelector(false)} 
      />
    </div>
  );
};

export default Layout;