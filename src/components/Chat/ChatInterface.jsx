import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Image as ImageIcon, 
  Loader2,
  Sparkles,
  Brain,
  Trophy
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';
import AIService from '../../services/AIService';
import TTSService from '../../services/TTSService';

const ChatInterface = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const {
    currentConversation,
    isAIResponding,
    isListening,
    isSpeaking,
    addMessage,
    setAIResponding,
    setListening,
    setSpeaking,
    addPoints,
    addAchievement,
    user,
    userRole,
    settings
  } = useStore();

  const [inputMessage, setInputMessage] = useState('');
  const [currentSubject, setCurrentSubject] = useState(location.state?.subject || 'general');
  const [challengeMode, setChallengeMode] = useState(false);
  const [pendingChallenge, setPendingChallenge] = useState(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInputMessage(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVoiceToggle = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setListening(false);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ 
        continuous: true,
        language: settings.language === 'tl' ? 'tl-PH' : settings.language
      });
      setListening(true);
    }
  };

  const handleTTSToggle = async (text) => {
    if (isSpeaking) {
      TTSService.stop();
      setSpeaking(false);
    } else {
      setSpeaking(true);
      try {
        await TTSService.speak(text, settings.language);
      } catch (error) {
        console.error('TTS Error:', error);
        toast.error('Could not play audio');
      } finally {
        setSpeaking(false);
      }
    }
  };

  const handleImageUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageMessage = {
          type: 'user',
          content: 'I uploaded an image for help',
          image: reader.result,
          subject: currentSubject
        };
        addMessage(imageMessage);
        
        // Process image with AI (simulate)
        setTimeout(() => {
          handleAIResponse('I can see your homework! Let me help you with this problem. Can you tell me what specific part you\'re having trouble with?');
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleImageUpload,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isAIResponding) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      subject: currentSubject
    };

    addMessage(userMessage);
    setInputMessage('');
    resetTranscript();

    // Check if responding to a challenge
    if (pendingChallenge) {
      handleChallengeResponse(inputMessage);
      return;
    }

    try {
      setAIResponding(true);
      const response = await AIService.getResponse(inputMessage, currentSubject, currentConversation);
      
      // Check if AI wants to create a challenge
      if (response.includesChallenge) {
        setPendingChallenge(response.challenge);
        setChallengeMode(true);
      }

      handleAIResponse(response.content);
      
      // Award points for interaction
      addPoints(10);
      
    } catch (error) {
      console.error('AI Service Error:', error);
      handleAIResponse("I'm having trouble right now. Can you try asking me again?");
    }
  };

  const handleChallengeResponse = async (userAnswer) => {
    try {
      const isCorrect = await AIService.evaluateAnswer(pendingChallenge, userAnswer);
      
      if (isCorrect) {
        addPoints(25);
        addAchievement({
          title: 'Challenge Completed!',
          description: `Solved a ${currentSubject} problem`,
          points: 25
        });
        
        handleAIResponse('🎉 Excellent! You got it right! You\'re really understanding this concept well. Here\'s the explanation...');
        toast.success('Challenge completed! +25 points');
      } else {
        handleAIResponse('Not quite right, but that\'s okay! Let me give you a hint to help you figure it out...');
        // Don't clear challenge yet, give them another chance
        return;
      }
      
      setPendingChallenge(null);
      setChallengeMode(false);
    } catch (error) {
      console.error('Challenge evaluation error:', error);
      handleAIResponse('Let me help you work through this step by step...');
    }
  };

  const handleAIResponse = (content) => {
    const aiMessage = {
      type: 'ai',
      content: content,
      subject: currentSubject
    };
    
    addMessage(aiMessage);
    setAIResponding(false);
    
    // Auto-play TTS if enabled
    if (settings.voiceEnabled && userRole === 'child') {
      setTimeout(() => {
        handleTTSToggle(content);
      }, 500);
    }
  };

  const MessageBubble = ({ message, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-xs lg:max-w-md ${message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
        {message.image && (
          <img 
            src={message.image} 
            alt="Uploaded homework" 
            className="w-full rounded-lg mb-2"
          />
        )}
        
        <p className="whitespace-pre-wrap">{message.content}</p>
        
        {message.type === 'ai' && (
          <button
            onClick={() => handleTTSToggle(message.content)}
            className="mt-2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
            title="Read aloud"
          >
            {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        )}
        
        <div className="text-xs opacity-70 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  );

  if (!browserSupportsSpeechRecognition) {
    console.warn('Browser does not support speech recognition');
  }

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-t-2xl p-4 shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
              <Brain className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 font-child-friendly">
                AI Tutor
              </h2>
              <p className="text-sm text-gray-500 capitalize">
                {currentSubject} • {currentConversation.length} messages
              </p>
            </div>
          </div>
          
          {challengeMode && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold"
            >
              <Trophy size={16} />
              Challenge Mode
            </motion.div>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 bg-white p-4 overflow-y-auto">
        <AnimatePresence>
          {currentConversation.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 font-child-friendly">
                Hi {userRole === 'child' ? user?.childName : user?.guardianName}!
              </h3>
              <p className="text-gray-600 mb-6">
                I'm your AI tutor. Ask me anything about {currentSubject} or upload a photo of your homework!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-blue-800 mb-2">Ask Questions</h4>
                  <p className="text-sm text-blue-600">Type or speak your questions</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-green-800 mb-2">Upload Images</h4>
                  <p className="text-sm text-green-600">Show me your homework</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-purple-800 mb-2">Get Challenges</h4>
                  <p className="text-sm text-purple-600">Practice with fun problems</p>
                </div>
              </div>
            </motion.div>
          ) : (
            currentConversation.map((message, index) => (
              <MessageBubble key={message.id} message={message} index={index} />
            ))
          )}
        </AnimatePresence>
        
        {isAIResponding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start mb-4"
          >
            <div className="chat-bubble-ai flex items-center gap-2">
              <Loader2 className="animate-spin" size={16} />
              <span>Thinking...</span>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-b-2xl p-4 border-t border-gray-100">
        {/* Image Upload Area */}
        <div {...getRootProps()} className={`mb-4 p-4 border-2 border-dashed rounded-xl transition-colors ${
          isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400'
        }`}>
          <input {...getInputProps()} />
          <div className="text-center">
            <ImageIcon className="mx-auto text-gray-400 mb-2" size={24} />
            <p className="text-sm text-gray-600">
              {isDragActive ? 'Drop your homework image here!' : 'Drag & drop or click to upload homework images'}
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={t('chat.typeMessage')}
              className="w-full p-3 border-2 border-gray-200 rounded-xl resize-none focus:border-primary-500 focus:outline-none transition-colors"
              rows="2"
              disabled={isAIResponding}
            />
            {listening && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-500 mt-1 flex items-center gap-1"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                {t('chat.listening')}
              </motion.div>
            )}
          </div>

          {/* Voice Button */}
          {browserSupportsSpeechRecognition && (
            <motion.button
              type="button"
              onClick={handleVoiceToggle}
              className={`p-3 rounded-xl transition-colors ${
                listening 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isAIResponding}
            >
              {listening ? <MicOff size={20} /> : <Mic size={20} />}
            </motion.button>
          )}

          {/* Send Button */}
          <motion.button
            type="submit"
            className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!inputMessage.trim() || isAIResponding}
          >
            {isAIResponding ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Send size={20} />
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;