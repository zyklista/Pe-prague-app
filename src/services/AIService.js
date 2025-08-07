class AIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.baseURL = 'https://api.openai.com/v1';
  }

  async getResponse(userMessage, subject, conversationHistory) {
    try {
      // For demo purposes, we'll use simulated responses
      // In production, this would call OpenAI API with proper content filtering
      
      const response = await this.simulateAIResponse(userMessage, subject, conversationHistory);
      return response;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to get AI response');
    }
  }

  async simulateAIResponse(userMessage, subject, conversationHistory) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = userMessage.toLowerCase();
    
    // Educational responses based on subject and keywords
    const responses = {
      math: {
        keywords: ['add', 'subtract', 'multiply', 'divide', 'equation', 'solve', 'calculate'],
        responses: [
          "Great question! Let's work through this step by step. Can you tell me what numbers you're working with?",
          "Math is like solving puzzles! Let me help you break this down into smaller pieces.",
          "I love helping with math! Let's start by identifying what operation we need to use.",
          "That's a wonderful math problem! Let me guide you through the solution process."
        ],
        challenges: [
          {
            question: "If you have 15 apples and give away 7, how many do you have left?",
            answer: "8",
            hint: "Think about subtraction: 15 - 7 = ?"
          },
          {
            question: "What is 6 × 4?",
            answer: "24",
            hint: "Try adding 6 four times: 6 + 6 + 6 + 6"
          }
        ]
      },
      science: {
        keywords: ['experiment', 'why', 'how', 'what happens', 'because'],
        responses: [
          "Science is all about asking questions! That's a fantastic observation.",
          "Let's explore this together! Science helps us understand the world around us.",
          "Great scientific thinking! Let me help you discover the answer.",
          "That's the kind of curiosity that makes great scientists!"
        ],
        challenges: [
          {
            question: "What do plants need to grow? Name three things.",
            answer: "water, sunlight, nutrients",
            hint: "Think about what you see plants getting from their environment"
          }
        ]
      },
      english: {
        keywords: ['read', 'write', 'story', 'word', 'grammar', 'spelling'],
        responses: [
          "Reading and writing are such important skills! Let me help you with that.",
          "Words are powerful tools! Let's explore this together.",
          "Great question about language! Let me guide you through this.",
          "I love helping with English! Let's make learning fun."
        ],
        challenges: [
          {
            question: "Can you write a sentence using the word 'adventure'?",
            answer: "adventure",
            hint: "Think about exciting journeys or experiences"
          }
        ]
      },
      general: {
        keywords: ['help', 'question', 'learn', 'understand'],
        responses: [
          "I'm here to help you learn! What would you like to explore today?",
          "That's a great question! Learning is an adventure.",
          "I love helping students discover new things! Let's dive in.",
          "You're doing great by asking questions! That's how we learn."
        ]
      }
    };

    const subjectData = responses[subject] || responses.general;
    
    // Check if message contains subject-specific keywords
    const hasKeyword = subjectData.keywords && 
      subjectData.keywords.some(keyword => lowerMessage.includes(keyword));
    
    let response;
    let includesChallenge = false;
    let challenge = null;

    // Determine if we should include a challenge (randomly, after a few exchanges)
    if (conversationHistory.length > 2 && Math.random() > 0.6 && subjectData.challenges) {
      includesChallenge = true;
      challenge = subjectData.challenges[Math.floor(Math.random() * subjectData.challenges.length)];
      
      response = `${this.getRandomResponse(subjectData.responses)} 

Here's a fun challenge for you: ${challenge.question}

Take your time to think about it! 🤔`;
    } else if (hasKeyword || subject !== 'general') {
      response = this.getRandomResponse(subjectData.responses);
    } else {
      // Generic helpful responses
      const genericResponses = [
        "That's an interesting question! Can you tell me more about what you're trying to understand?",
        "I'd love to help you with that! What specific part would you like to focus on?",
        "Great thinking! Let me help you explore this topic further.",
        "That's a wonderful question! Learning happens when we're curious like you are."
      ];
      response = this.getRandomResponse(genericResponses);
    }

    // Add child-friendly encouragement
    const encouragements = [
      "You're doing amazing! 🌟",
      "Keep up the great work! 💪",
      "I'm proud of you for asking questions! 🎉",
      "You're such a smart learner! 🧠",
      "That's fantastic thinking! ⭐"
    ];

    if (Math.random() > 0.7) {
      response += `\n\n${this.getRandomResponse(encouragements)}`;
    }

    return {
      content: this.filterContent(response),
      includesChallenge,
      challenge
    };
  }

  async evaluateAnswer(challenge, userAnswer) {
    // Simulate evaluation delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const correctAnswer = challenge.answer.toLowerCase();

    // Simple evaluation - in production, this would be more sophisticated
    if (normalizedAnswer.includes(correctAnswer)) {
      return true;
    }

    // Check for partial matches or alternative correct answers
    const partialMatches = {
      '8': ['eight', 'ate'],
      '24': ['twenty-four', 'twenty four'],
      'water, sunlight, nutrients': ['water', 'sunlight', 'nutrients', 'sun', 'light']
    };

    const alternatives = partialMatches[correctAnswer] || [];
    return alternatives.some(alt => normalizedAnswer.includes(alt.toLowerCase()));
  }

  filterContent(content) {
    // Child-safety content filtering
    const inappropriateWords = [
      // Add inappropriate words/phrases to filter
    ];

    let filteredContent = content;
    
    inappropriateWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      filteredContent = filteredContent.replace(regex, '[filtered]');
    });

    // Ensure educational and positive tone
    if (filteredContent.length < 10) {
      filteredContent = "I'd love to help you learn! Can you ask me about your studies?";
    }

    return filteredContent;
  }

  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Method to process uploaded images (placeholder for future implementation)
  async processImage(imageData, subject) {
    // In production, this would use OCR and image recognition
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      content: "I can see your homework! It looks like a " + subject + " problem. Can you tell me what specific part you need help with?",
      extractedText: "Sample extracted text from image",
      confidence: 0.85
    };
  }

  // Method to generate subject-specific study materials
  generateStudyMaterial(subject, topic) {
    const materials = {
      math: {
        practice: "Let's practice with some fun problems!",
        explanation: "Here's how this concept works...",
        tips: "Remember these helpful tips..."
      },
      science: {
        experiment: "Here's a safe experiment you can try...",
        explanation: "This happens because...",
        facts: "Did you know..."
      },
      english: {
        reading: "Let's read this together...",
        writing: "Here's how to structure your writing...",
        vocabulary: "New words to learn..."
      }
    };

    return materials[subject] || materials.english;
  }
}

export default new AIService();