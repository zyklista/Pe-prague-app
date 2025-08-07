import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calculator, 
  Microscope, 
  Globe, 
  Clock,
  MessageCircle,
  Trophy,
  Star
} from 'lucide-react';
import useStore from '../../store/useStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { 
    user, 
    userRole, 
    avatar, 
    isTutorTimeActive, 
    checkTutorTime,
    addPoints 
  } = useStore();

  useEffect(() => {
    checkTutorTime();
  }, [checkTutorTime]);

  const subjects = [
    { key: 'math', icon: Calculator, color: 'from-blue-500 to-cyan-500', emoji: '🧮' },
    { key: 'science', icon: Microscope, color: 'from-green-500 to-emerald-500', emoji: '🔬' },
    { key: 'english', icon: BookOpen, color: 'from-purple-500 to-violet-500', emoji: '📚' },
    { key: 'history', icon: Globe, color: 'from-orange-500 to-red-500', emoji: '🏛️' },
    { key: 'geography', icon: Globe, color: 'from-teal-500 to-cyan-500', emoji: '🌍' },
    { key: 'art', icon: Star, color: 'from-pink-500 to-rose-500', emoji: '🎨' }
  ];

  const handleSubjectSelect = (subject) => {
    if (!isTutorTimeActive) return;
    
    // Add points for starting a study session
    addPoints(5);
    
    // Navigate to chat with selected subject
    navigate('/chat', { state: { subject: subject.key } });
  };

  const handleStartChat = () => {
    if (!isTutorTimeActive) return;
    navigate('/chat');
  };

  if (!isTutorTimeActive) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock size={48} className="text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-600 mb-4 font-child-friendly">
            {t('notTutorTime')}
          </h2>
          
          <p className="text-gray-500 text-lg mb-8">
            Come back during tutor hours to start learning!
          </p>
          
          <div className="bg-white rounded-2xl p-6 max-w-md mx-auto shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Tutor Hours
            </h3>
            <p className="text-2xl font-bold text-primary-600">
              9:00 AM - 3:00 PM
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Ask your guardian to change these hours in Settings
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                className="text-4xl font-bold font-child-friendly mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t('welcome', { name: userRole === 'child' ? user?.childName : user?.guardianName })}
              </motion.h1>
              <motion.p 
                className="text-xl opacity-90"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Ready to learn something amazing today?
              </motion.p>
            </div>
            
            <motion.div
              className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <span className="text-5xl">🎓</span>
            </motion.div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-6 mt-6">
            <div className="bg-white bg-opacity-20 rounded-xl p-4 flex items-center gap-3">
              <Trophy className="text-yellow-300" size={24} />
              <div>
                <p className="text-sm opacity-80">Level</p>
                <p className="text-xl font-bold">{avatar.level}</p>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 flex items-center gap-3">
              <Star className="text-yellow-300" size={24} />
              <div>
                <p className="text-sm opacity-80">Points</p>
                <p className="text-xl font-bold">{avatar.points}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Start Chat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <motion.button
          onClick={handleStartChat}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center gap-4">
            <MessageCircle size={32} />
            <div className="text-left">
              <h3 className="text-2xl font-bold">Start Chatting Now!</h3>
              <p className="text-emerald-100">Ask me anything about your studies</p>
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Subject Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-child-friendly">
          Choose Your Subject
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <motion.button
                key={subject.key}
                onClick={() => handleSubjectSelect(subject)}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${subject.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{subject.emoji}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-child-friendly">
                    {t(`subjects.${subject.key}`)}
                  </h3>
                  
                  <p className="text-gray-600 text-sm">
                    Let's explore {t(`subjects.${subject.key}`).toLowerCase()} together!
                  </p>
                  
                  <div className="mt-4 flex items-center justify-center gap-2 text-primary-600 group-hover:text-primary-700">
                    <span className="font-semibold">Start Learning</span>
                    <Icon size={16} />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Achievements */}
      {avatar.achievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-child-friendly">
            Recent Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {avatar.achievements.slice(-3).map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Trophy className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;