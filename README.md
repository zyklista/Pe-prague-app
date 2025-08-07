# 🎓 AI Tutor Buddy - Personalized Learning Companion

A comprehensive AI-powered tutoring application designed for students from grade school to college, featuring multi-language support, voice interaction, and child-safe learning experiences.

## ✨ Features

### 🤖 AI-Powered Tutoring
- **Intelligent Responses**: Context-aware AI tutor that adapts to different subjects
- **Educational Challenges**: Interactive problems that encourage critical thinking
- **Step-by-step Guidance**: Helps students work through problems independently
- **Content Filtering**: Child-safe responses with educational focus

### 🗣️ Voice & Speech Features
- **Speech Recognition**: Students can ask questions by speaking
- **Text-to-Speech**: AI responses are read aloud in multiple languages
- **Voice Verification**: Optional voice authentication for child accounts
- **Multi-language Voice Support**: Natural speech in 6+ languages

### 🌍 Multi-Language Support
- **English** 🇺🇸
- **Tagalog** 🇵🇭 
- **Chinese** 🇨🇳
- **Czech** 🇨🇿
- **French** 🇫🇷
- **German** 🇩🇪

### 📚 Subject Coverage
- **Mathematics**: Arithmetic, algebra, geometry, problem-solving
- **Science**: Biology, chemistry, physics, experiments
- **English**: Reading, writing, grammar, vocabulary
- **History**: World history, events, timelines
- **Geography**: Countries, cultures, maps
- **Art**: Creative expression, techniques

### 👨‍👩‍👧‍👦 Family-Friendly Controls
- **Time Restrictions**: Configurable tutoring hours (default: 9 AM - 3 PM)
- **Adult Mode**: Guardian access to advanced settings
- **Child Safety**: Content filtering and age-appropriate responses
- **Privacy Protection**: Secure data handling and storage

### 🎮 Gamification & Rewards
- **Avatar System**: Unlockable avatars based on level progression
- **Points & Levels**: Earn points for learning activities
- **Achievements**: Unlock badges for milestones
- **Progress Tracking**: Visual progress indicators

### 📱 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Child-Friendly Interface**: Colorful, intuitive, and engaging
- **Smooth Animations**: Delightful interactions and transitions
- **Accessibility**: Voice controls and screen reader support

### 📝 Learning Management
- **Conversation History**: Save and review past learning sessions
- **Image Upload**: Get help with homework by uploading photos
- **Export Conversations**: Download learning sessions for reference
- **Subject Filtering**: Organize conversations by academic subject

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Modern web browser with microphone access (for voice features)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ai-tutor-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173` to access the application.

### Environment Variables (Optional)
For production use with real AI services, create a `.env` file:
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## 📖 Usage Guide

### First Time Setup
1. **Sign Up**: Create an account with child and guardian information
2. **Choose User Type**: Select "Child" or "Guardian" mode
3. **Enable Voice**: Optionally enable voice recognition during setup
4. **Set Tutor Hours**: Guardians can configure active learning hours

### For Students
1. **Dashboard**: Start from the main dashboard with subject selection
2. **Ask Questions**: Type or speak questions to your AI tutor
3. **Upload Homework**: Take photos of homework for help
4. **Earn Rewards**: Complete challenges to earn points and unlock avatars
5. **Review History**: Check past conversations in the History section

### For Guardians
1. **Access Settings**: Use adult mode to modify time restrictions
2. **Monitor Progress**: View learning statistics and achievements
3. **Customize Experience**: Adjust language, voice, and safety settings
4. **Export Data**: Download conversation history for records

### Demo Credentials
For testing purposes, you can use any email/password combination. The app includes:
- **Guardian Password**: `admin123` or guardian's name (lowercase)
- **Demo Data**: Pre-loaded conversations and achievements
- **Sample Interactions**: Ready-to-use conversation examples

## 🛡️ Safety & Privacy

### Child Protection
- **Content Filtering**: All AI responses are filtered for age-appropriateness
- **Time Restrictions**: Learning sessions limited to configured hours
- **Adult Supervision**: Guardian controls for sensitive settings
- **Safe Interactions**: Educational focus with positive reinforcement

### Data Security
- **Local Storage**: User data stored locally in browser
- **No Data Sharing**: Conversations remain private and secure
- **Secure Authentication**: Protected login system
- **Privacy by Design**: Minimal data collection principles

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18**: Modern component-based UI framework
- **Vite**: Fast development build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Zustand**: Lightweight state management

### Key Libraries
- **react-speech-recognition**: Browser speech recognition
- **react-i18next**: Internationalization support
- **react-dropzone**: Drag-and-drop file uploads
- **date-fns**: Date manipulation and formatting
- **react-hot-toast**: User notifications

### AI Integration
- **Modular AI Service**: Easy integration with various AI providers
- **Content Filtering**: Built-in safety mechanisms
- **Context Awareness**: Conversation history for better responses
- **Subject Specialization**: Tailored responses by academic subject

## 🎨 Design Philosophy

### Child-Centric Design
- **Friendly Colors**: Soft gradients and vibrant accents
- **Large Touch Targets**: Easy interaction for young users
- **Clear Typography**: Readable fonts optimized for children
- **Intuitive Navigation**: Simple, icon-based interface

### Educational Psychology
- **Positive Reinforcement**: Encouraging messages and rewards
- **Scaffolded Learning**: Gradual difficulty progression
- **Active Engagement**: Interactive challenges and questions
- **Growth Mindset**: Focus on learning process over outcomes

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── Auth/           # Authentication components
│   ├── Chat/           # Chat interface
│   ├── Dashboard/      # Main dashboard
│   ├── Settings/       # Settings panel
│   ├── History/        # Conversation history
│   ├── Layout/         # App layout
│   └── Avatar/         # Avatar system
├── services/           # External services
│   ├── AIService.js    # AI integration
│   └── TTSService.js   # Text-to-speech
├── store/              # State management
│   ├── useStore.js     # Main store
│   └── demoData.js     # Demo content
├── i18n/               # Internationalization
└── styles/             # Global styles
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The built files in `dist/` can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Environment Configuration
- Set `VITE_OPENAI_API_KEY` for production AI integration
- Configure HTTPS for microphone access
- Enable CORS for API endpoints

## 📱 Browser Compatibility

### Supported Browsers
- **Chrome** 60+ (recommended)
- **Firefox** 55+
- **Safari** 14+
- **Edge** 79+

### Required Features
- **Web Speech API** for voice recognition
- **Speech Synthesis API** for text-to-speech
- **ES6+ Support** for modern JavaScript
- **CSS Grid & Flexbox** for responsive layout

## 🤝 Support

### Common Issues
1. **Microphone not working**: Ensure HTTPS and browser permissions
2. **Voice not playing**: Check browser audio settings
3. **App not loading**: Clear browser cache and cookies
4. **Time restrictions**: Check system clock and settings

### Getting Help
- Check browser console for error messages
- Verify microphone and speaker permissions
- Test with different browsers
- Review network connectivity

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for AI technology inspiration
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Framer Motion** for beautiful animations
- **Educational Psychology** research for learning principles

---

**Made with ❤️ for young learners everywhere**

*Empowering the next generation through personalized AI education*
