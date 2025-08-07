import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Calendar, 
  Book, 
  Search, 
  Filter,
  Trash2,
  Eye,
  Download,
  Clock
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';

const ConversationHistory = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { conversations, user, userRole } = useStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Get unique subjects from conversations
  const subjects = ['all', ...new Set(conversations.map(conv => conv.subject))];

  // Filter conversations based on search and subject
  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = searchTerm === '' || 
      conversation.messages.some(msg => 
        msg.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesSubject = selectedSubject === 'all' || conversation.subject === selectedSubject;
    
    return matchesSearch && matchesSubject;
  });

  const handleViewConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleDeleteConversation = (conversationId) => {
    // In a real app, this would update the store
    toast.success('Conversation deleted');
    setShowDeleteConfirm(null);
  };

  const handleExportConversation = (conversation) => {
    const content = conversation.messages
      .map(msg => `${msg.type === 'user' ? 'Student' : 'AI Tutor'}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${format(new Date(conversation.date), 'yyyy-MM-dd')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Conversation exported!');
  };

  const ConversationCard = ({ conversation, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => handleViewConversation(conversation)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center">
            <Book className="text-white" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 capitalize">
              {conversation.subject} Session
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar size={14} />
              {format(new Date(conversation.date), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
            {conversation.messages.length} messages
          </span>
        </div>
      </div>
      
      {/* Preview of first few messages */}
      <div className="space-y-2 mb-4">
        {conversation.messages.slice(0, 2).map((message, idx) => (
          <div key={idx} className="text-sm">
            <span className={`font-semibold ${
              message.type === 'user' ? 'text-primary-600' : 'text-secondary-600'
            }`}>
              {message.type === 'user' ? 'You' : 'AI Tutor'}:
            </span>
            <span className="text-gray-600 ml-2">
              {message.content.length > 100 
                ? message.content.substring(0, 100) + '...' 
                : message.content
              }
            </span>
          </div>
        ))}
        {conversation.messages.length > 2 && (
          <p className="text-xs text-gray-400">
            +{conversation.messages.length - 2} more messages
          </p>
        )}
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock size={12} />
          {formatDistanceToNow(new Date(conversation.date), { addSuffix: true })}
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleExportConversation(conversation);
            }}
            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Export conversation"
          >
            <Download size={16} />
          </motion.button>
          
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteConfirm(conversation.id);
            }}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Delete conversation"
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const ConversationModal = ({ conversation, onClose }) => (
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
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 capitalize">
                {conversation.subject} Session
              </h2>
              <p className="text-gray-500">
                {format(new Date(conversation.date), 'MMMM d, yyyy • h:mm a')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
        
        {/* Messages */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {conversation.messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${
                  message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                }`}>
                  {message.image && (
                    <img 
                      src={message.image} 
                      alt="Homework" 
                      className="w-full rounded-lg mb-2"
                    />
                  )}
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div className="text-xs opacity-70 mt-2">
                    {format(new Date(message.timestamp), 'h:mm a')}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {conversation.messages.length} messages • {conversation.subject}
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => handleExportConversation(conversation)}
              className="btn-secondary flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={16} />
              Export
            </motion.button>
            <motion.button
              onClick={onClose}
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 font-child-friendly mb-2">
          Conversation History
        </h1>
        <p className="text-gray-600">
          Review your learning sessions with AI Tutor
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
          />
        </div>
        
        {/* Subject Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors bg-white appearance-none min-w-[150px]"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject} className="capitalize">
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Sessions</p>
              <p className="text-3xl font-bold">{conversations.length}</p>
            </div>
            <MessageSquare size={32} className="text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Messages Sent</p>
              <p className="text-3xl font-bold">
                {conversations.reduce((total, conv) => total + conv.messages.length, 0)}
              </p>
            </div>
            <Book size={32} className="text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Subjects Studied</p>
              <p className="text-3xl font-bold">{subjects.length - 1}</p>
            </div>
            <Calendar size={32} className="text-purple-200" />
          </div>
        </div>
      </div>

      {/* Conversations Grid */}
      {filteredConversations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="text-gray-400" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-600 mb-2">
            {searchTerm || selectedSubject !== 'all' ? 'No conversations found' : 'No conversations yet'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedSubject !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Start chatting with your AI tutor to see conversations here'
            }
          </p>
          {!searchTerm && selectedSubject === 'all' && (
            <motion.button
              onClick={() => navigate('/chat')}
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your First Chat
            </motion.button>
          )}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConversations.map((conversation, index) => (
            <ConversationCard
              key={conversation.id}
              conversation={conversation}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Conversation Modal */}
      <AnimatePresence>
        {selectedConversation && (
          <ConversationModal
            conversation={selectedConversation}
            onClose={() => setSelectedConversation(null)}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Delete Conversation?
              </h3>
              <p className="text-gray-600 mb-6">
                This action cannot be undone. The conversation will be permanently deleted.
              </p>
              
              <div className="flex gap-3">
                <motion.button
                  onClick={() => handleDeleteConversation(showDeleteConfirm)}
                  className="btn-primary bg-red-500 hover:bg-red-600 flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Delete
                </motion.button>
                <motion.button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="btn-secondary flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConversationHistory;