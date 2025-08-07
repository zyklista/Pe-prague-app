import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { UserPlus, LogIn, Mic, MicOff, Users, Baby } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';

const AuthScreen = () => {
  const { t } = useTranslation();
  const { login } = useStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState('child'); // 'child' or 'guardian'
  const [voiceAuthEnabled, setVoiceAuthEnabled] = useState(false);
  const [formData, setFormData] = useState({
    childName: '',
    guardianName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Validation for sign up
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      
      if (!formData.childName || !formData.guardianName || !formData.email || !formData.password) {
        toast.error('Please fill in all fields');
        return;
      }

      // Simulate account creation
      const userData = {
        id: Date.now(),
        childName: formData.childName,
        guardianName: formData.guardianName,
        email: formData.email,
        role: userType,
        voiceAuthEnabled,
        createdAt: new Date().toISOString()
      };

      login(userData);
      toast.success(`Welcome ${userType === 'child' ? formData.childName : formData.guardianName}!`);
    } else {
      // Sign in logic
      if (!formData.email || !formData.password) {
        toast.error('Please enter email and password');
        return;
      }

      // Simulate sign in (in real app, this would be API call)
      const userData = {
        id: Date.now(),
        childName: 'Demo Child',
        guardianName: 'Demo Guardian',
        email: formData.email,
        role: userType,
        voiceAuthEnabled: false
      };

      login(userData);
      toast.success(`Welcome back ${userType === 'child' ? userData.childName : userData.guardianName}!`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-3xl">🎓</span>
          </motion.div>
          <h1 className="text-3xl font-bold font-child-friendly text-gray-800 mb-2">
            AI Tutor Buddy
          </h1>
          <p className="text-gray-600">
            Your personal learning companion
          </p>
        </div>

        {/* User Type Selection */}
        <div className="flex mb-6 bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setUserType('child')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
              userType === 'child'
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Baby size={20} />
            Child
          </button>
          <button
            type="button"
            onClick={() => setUserType('guardian')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
              userType === 'guardian'
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Users size={20} />
            Guardian
          </button>
        </div>

        {/* Auth Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('auth.childName')}
                  </label>
                  <input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter child's name"
                    required={isSignUp}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('auth.guardianName')}
                  </label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter guardian's name"
                    required={isSignUp}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('auth.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('auth.password')}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter password"
                required
              />
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('auth.confirmPassword')}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Confirm password"
                  required={isSignUp}
                />
              </div>
            )}

            {isSignUp && (
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700">
                    {t('auth.enableVoiceAuth')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Helps verify your child's identity
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setVoiceAuthEnabled(!voiceAuthEnabled)}
                  className={`p-3 rounded-lg transition-colors ${
                    voiceAuthEnabled
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {voiceAuthEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              {isSignUp ? (
                <>
                  <UserPlus size={20} />
                  {t('auth.signUp')}
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  {t('auth.signIn')}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </motion.div>

        {/* Demo Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
        >
          <p className="text-sm text-yellow-800 text-center">
            <strong>Demo Mode:</strong> You can use any email/password combination to try the app
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthScreen;