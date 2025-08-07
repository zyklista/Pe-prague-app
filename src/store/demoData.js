// Demo data for the AI Tutor app
export const demoConversations = [
  {
    id: 1,
    subject: 'math',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    messages: [
      {
        id: 1,
        type: 'user',
        content: 'Can you help me with fractions?',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        subject: 'math'
      },
      {
        id: 2,
        type: 'ai',
        content: 'Of course! Fractions are really fun once you understand them. Think of a fraction like a pizza that\'s been cut into pieces. The bottom number tells us how many pieces the pizza was cut into, and the top number tells us how many pieces we have. What specific part of fractions would you like to work on?',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30000).toISOString(),
        subject: 'math'
      },
      {
        id: 3,
        type: 'user',
        content: 'How do I add fractions?',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 60000).toISOString(),
        subject: 'math'
      },
      {
        id: 4,
        type: 'ai',
        content: 'Great question! To add fractions, we need to make sure they have the same bottom number (called the denominator). It\'s like making sure both pizzas are cut into the same number of pieces before we can count all our slices together!\n\nHere\'s a fun challenge for you: If you have 1/4 of a pizza and your friend gives you 1/4 more, how much pizza do you have in total?\n\nTake your time to think about it! 🤔',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 90000).toISOString(),
        subject: 'math'
      },
      {
        id: 5,
        type: 'user',
        content: '2/4?',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 120000).toISOString(),
        subject: 'math'
      },
      {
        id: 6,
        type: 'ai',
        content: '🎉 Excellent! You got it right! Yes, 1/4 + 1/4 = 2/4, which can also be simplified to 1/2. You\'re really understanding this concept well!\n\nYou\'re doing amazing! 🌟',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 125000).toISOString(),
        subject: 'math'
      }
    ]
  },
  {
    id: 2,
    subject: 'science',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    messages: [
      {
        id: 7,
        type: 'user',
        content: 'Why do plants need sunlight?',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        subject: 'science'
      },
      {
        id: 8,
        type: 'ai',
        content: 'That\'s a fantastic question! Plants need sunlight because they use it to make their own food through a process called photosynthesis. It\'s like plants have their own kitchen inside their leaves!\n\nThink of sunlight as the energy that powers the plant\'s food-making process. Just like you need energy to run and play, plants need energy from the sun to grow and stay healthy.',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 30000).toISOString(),
        subject: 'science'
      },
      {
        id: 9,
        type: 'user',
        content: 'What happens if plants don\'t get sunlight?',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 60000).toISOString(),
        subject: 'science'
      },
      {
        id: 10,
        type: 'ai',
        content: 'Great follow-up question! If plants don\'t get enough sunlight, they can\'t make enough food for themselves. They might become weak, their leaves might turn yellow, and they could eventually die.\n\nIt\'s like if you didn\'t eat enough food - you\'d feel weak and tired. Plants feel the same way without their sunlight!\n\nThat\'s the kind of curiosity that makes great scientists! ⭐',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 90000).toISOString(),
        subject: 'science'
      }
    ]
  },
  {
    id: 3,
    subject: 'english',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    messages: [
      {
        id: 11,
        type: 'user',
        content: 'I uploaded an image for help',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNhbXBsZSBIb21ld29yayBJbWFnZTwvdGV4dD48L3N2Zz4=',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        subject: 'english'
      },
      {
        id: 12,
        type: 'ai',
        content: 'I can see your homework! It looks like an English problem. Can you tell me what specific part you\'re having trouble with?',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000 + 10000).toISOString(),
        subject: 'english'
      },
      {
        id: 13,
        type: 'user',
        content: 'I need to write a story about adventure',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000 + 30000).toISOString(),
        subject: 'english'
      },
      {
        id: 14,
        type: 'ai',
        content: 'How exciting! Adventure stories are some of the most fun to write and read. Let me help you brainstorm some ideas.\n\nFirst, let\'s think about the main character. Who is going on this adventure? It could be a brave kid like you, a magical creature, or even an animal!\n\nWhat kind of adventure are you most interested in writing about? A treasure hunt? A journey to a magical land? Or maybe exploring somewhere new?',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000 + 45000).toISOString(),
        subject: 'english'
      }
    ]
  }
];

export const demoAchievements = [
  {
    id: 1,
    title: 'First Steps!',
    description: 'Completed your first chat session',
    points: 10,
    unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    icon: '🎯'
  },
  {
    id: 2,
    title: 'Math Wizard!',
    description: 'Solved 5 math problems correctly',
    points: 25,
    unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    icon: '🧮'
  },
  {
    id: 3,
    title: 'Curious Mind!',
    description: 'Asked 10 great questions',
    points: 15,
    unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    icon: '🤔'
  },
  {
    id: 4,
    title: 'Science Explorer!',
    description: 'Learned about plants and photosynthesis',
    points: 20,
    unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    icon: '🔬'
  }
];

export const avatarOptions = [
  { id: 'default', name: 'Student', emoji: '👶', requiredLevel: 1 },
  { id: 'scholar', name: 'Young Scholar', emoji: '🧑‍🎓', requiredLevel: 2 },
  { id: 'scientist', name: 'Little Scientist', emoji: '🧑‍🔬', requiredLevel: 3 },
  { id: 'artist', name: 'Creative Artist', emoji: '🧑‍🎨', requiredLevel: 4 },
  { id: 'explorer', name: 'Adventure Explorer', emoji: '🧭', requiredLevel: 5 },
  { id: 'wizard', name: 'Knowledge Wizard', emoji: '🧙‍♂️', requiredLevel: 6 },
  { id: 'superhero', name: 'Learning Hero', emoji: '🦸‍♂️', requiredLevel: 8 },
  { id: 'astronaut', name: 'Space Explorer', emoji: '👨‍🚀', requiredLevel: 10 }
];

export const subjectEmojis = {
  math: '🧮',
  science: '🔬',
  english: '📚',
  history: '🏛️',
  geography: '🌍',
  art: '🎨',
  general: '💡'
};

export const encouragementMessages = [
  "You're doing amazing! Keep up the great work! 🌟",
  "I'm so proud of your curiosity! 🎉",
  "You're such a smart learner! 🧠",
  "That's fantastic thinking! ⭐",
  "You're becoming a real expert! 🏆",
  "Keep asking great questions! 🤔",
  "You're making wonderful progress! 💪",
  "I love your enthusiasm for learning! ❤️"
];

// Function to initialize demo data for new users
export const initializeDemoData = () => {
  return {
    conversations: demoConversations,
    avatar: {
      level: 3,
      points: 275,
      achievements: demoAchievements,
      currentAvatar: 'scholar',
      unlockedAvatars: ['default', 'scholar', 'scientist']
    }
  };
};