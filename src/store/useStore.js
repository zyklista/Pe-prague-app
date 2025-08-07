import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initializeDemoData } from './demoData';

const useStore = create(
  persist(
    (set, get) => ({
      // Authentication state
      user: null,
      isAuthenticated: false,
      userRole: null, // 'child' or 'adult'
      
      // Settings state
      settings: {
        tutorTimeStart: '09:00',
        tutorTimeEnd: '15:00',
        language: 'en',
        voiceEnabled: false,
        adultModeEnabled: false,
        childSafetyMode: true,
      },
      
      // Avatar and rewards state
      avatar: {
        level: 1,
        points: 0,
        achievements: [],
        currentAvatar: 'default',
        unlockedAvatars: ['default'],
      },
      
      // Conversation state
      conversations: [],
      currentConversation: [],
      isAIResponding: false,
      
      // Voice state
      isListening: false,
      isSpeaking: false,
      
      // Time restriction state
      isTutorTimeActive: true,
      
      // Actions
      login: (userData) => {
        const demoData = initializeDemoData();
        set({
          user: userData,
          isAuthenticated: true,
          userRole: userData.role,
          conversations: demoData.conversations,
          avatar: demoData.avatar
        });
      },
      
      logout: () => set({
        user: null,
        isAuthenticated: false,
        userRole: null,
        currentConversation: []
      }),
      
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
      
      addMessage: (message) => set((state) => ({
        currentConversation: [...state.currentConversation, {
          ...message,
          id: Date.now(),
          timestamp: new Date().toISOString()
        }]
      })),
      
      saveConversation: () => set((state) => {
        if (state.currentConversation.length === 0) return state;
        
        const conversationToSave = {
          id: Date.now(),
          messages: state.currentConversation,
          date: new Date().toISOString(),
          subject: state.currentConversation[0]?.subject || 'General'
        };
        
        return {
          conversations: [...state.conversations, conversationToSave],
          currentConversation: []
        };
      }),
      
      clearCurrentConversation: () => set({
        currentConversation: []
      }),
      
      setAIResponding: (isResponding) => set({
        isAIResponding: isResponding
      }),
      
      setListening: (isListening) => set({
        isListening
      }),
      
      setSpeaking: (isSpeaking) => set({
        isSpeaking
      }),
      
      addPoints: (points) => set((state) => {
        const newPoints = state.avatar.points + points;
        const newLevel = Math.floor(newPoints / 100) + 1;
        
        return {
          avatar: {
            ...state.avatar,
            points: newPoints,
            level: newLevel
          }
        };
      }),
      
      unlockAvatar: (avatarId) => set((state) => ({
        avatar: {
          ...state.avatar,
          unlockedAvatars: [...state.avatar.unlockedAvatars, avatarId]
        }
      })),
      
      setCurrentAvatar: (avatarId) => set((state) => ({
        avatar: {
          ...state.avatar,
          currentAvatar: avatarId
        }
      })),
      
      checkTutorTime: () => {
        const state = get();
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        
        const [startHour, startMin] = state.settings.tutorTimeStart.split(':').map(Number);
        const [endHour, endMin] = state.settings.tutorTimeEnd.split(':').map(Number);
        
        const startTime = startHour * 60 + startMin;
        const endTime = endHour * 60 + endMin;
        
        const isActive = currentTime >= startTime && currentTime <= endTime;
        
        set({ isTutorTimeActive: isActive });
        return isActive;
      },
      
      addAchievement: (achievement) => set((state) => ({
        avatar: {
          ...state.avatar,
          achievements: [...state.avatar.achievements, {
            ...achievement,
            id: Date.now(),
            unlockedAt: new Date().toISOString()
          }]
        }
      }))
    }),
    {
      name: 'ai-tutor-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        userRole: state.userRole,
        settings: state.settings,
        avatar: state.avatar,
        conversations: state.conversations
      })
    }
  )
);

export default useStore;