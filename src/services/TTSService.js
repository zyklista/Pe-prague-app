class TTSService {
  constructor() {
    this.synth = window.speechSynthesis;
    this.currentUtterance = null;
    this.isSupported = 'speechSynthesis' in window;
  }

  async speak(text, language = 'en') {
    if (!this.isSupported) {
      throw new Error('Speech synthesis not supported');
    }

    // Stop any current speech
    this.stop();

    return new Promise((resolve, reject) => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configure voice settings
        utterance.rate = 0.8; // Slightly slower for children
        utterance.pitch = 1.1; // Slightly higher pitch for friendliness
        utterance.volume = 0.8;
        
        // Set language
        const languageMap = {
          'en': 'en-US',
          'tl': 'fil-PH', // Filipino
          'zh': 'zh-CN',
          'cs': 'cs-CZ',
          'fr': 'fr-FR',
          'de': 'de-DE'
        };
        
        utterance.lang = languageMap[language] || 'en-US';

        // Try to find a suitable voice
        const voices = this.synth.getVoices();
        const preferredVoice = this.findBestVoice(voices, utterance.lang);
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        // Event handlers
        utterance.onend = () => {
          this.currentUtterance = null;
          resolve();
        };

        utterance.onerror = (event) => {
          this.currentUtterance = null;
          reject(new Error(`Speech synthesis error: ${event.error}`));
        };

        utterance.onstart = () => {
          console.log('TTS started');
        };

        // Store current utterance and start speaking
        this.currentUtterance = utterance;
        this.synth.speak(utterance);

      } catch (error) {
        reject(error);
      }
    });
  }

  stop() {
    if (this.synth.speaking || this.synth.pending) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
  }

  pause() {
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
    }
  }

  resume() {
    if (this.synth.paused) {
      this.synth.resume();
    }
  }

  isSpeaking() {
    return this.synth.speaking;
  }

  isPaused() {
    return this.synth.paused;
  }

  findBestVoice(voices, targetLang) {
    // First, try to find an exact match
    let exactMatch = voices.find(voice => voice.lang === targetLang);
    if (exactMatch) return exactMatch;

    // Then try to find a voice with the same language code
    const langCode = targetLang.split('-')[0];
    let langMatch = voices.find(voice => voice.lang.startsWith(langCode));
    if (langMatch) return langMatch;

    // For child-friendly voices, prefer female voices when available
    const femaleVoices = voices.filter(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('girl')
    );

    if (femaleVoices.length > 0) {
      return femaleVoices[0];
    }

    // Fallback to default voice
    return voices.find(voice => voice.default) || voices[0] || null;
  }

  getAvailableVoices() {
    return this.synth.getVoices();
  }

  getVoicesForLanguage(language) {
    const voices = this.getAvailableVoices();
    const langCode = language.split('-')[0];
    
    return voices.filter(voice => 
      voice.lang.startsWith(langCode) || voice.lang === language
    );
  }

  // Method to test TTS with a sample phrase
  async testVoice(language = 'en') {
    const testPhrases = {
      'en': 'Hello! I am your AI tutor. How can I help you learn today?',
      'tl': 'Kumusta! Ako ang inyong AI tutor. Paano ko kayo matutulungan sa pag-aaral ngayon?',
      'zh': '你好！我是你的AI导师。今天我能帮你学什么？',
      'cs': 'Ahoj! Jsem váš AI tutor. Jak vám dnes mohu pomoci s učením?',
      'fr': 'Salut! Je suis votre tuteur IA. Comment puis-je vous aider à apprendre aujourd\'hui?',
      'de': 'Hallo! Ich bin euer KI-Tutor. Wie kann ich euch heute beim Lernen helfen?'
    };

    const phrase = testPhrases[language] || testPhrases['en'];
    
    try {
      await this.speak(phrase, language);
      return true;
    } catch (error) {
      console.error('TTS test failed:', error);
      return false;
    }
  }

  // Method to speak educational content with appropriate pacing
  async speakEducational(text, language = 'en', options = {}) {
    if (!this.isSupported) {
      throw new Error('Speech synthesis not supported');
    }

    // Stop any current speech
    this.stop();

    return new Promise((resolve, reject) => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Educational-specific settings
        utterance.rate = options.rate || 0.7; // Slower for better comprehension
        utterance.pitch = options.pitch || 1.0;
        utterance.volume = options.volume || 0.9;
        
        // Add pauses for better understanding
        const processedText = this.addEducationalPauses(text);
        utterance.text = processedText;
        
        // Set language
        const languageMap = {
          'en': 'en-US',
          'tl': 'fil-PH',
          'zh': 'zh-CN',
          'cs': 'cs-CZ',
          'fr': 'fr-FR',
          'de': 'de-DE'
        };
        
        utterance.lang = languageMap[language] || 'en-US';

        // Find child-friendly voice
        const voices = this.synth.getVoices();
        const childFriendlyVoice = this.findChildFriendlyVoice(voices, utterance.lang);
        
        if (childFriendlyVoice) {
          utterance.voice = childFriendlyVoice;
        }

        // Event handlers
        utterance.onend = () => {
          this.currentUtterance = null;
          resolve();
        };

        utterance.onerror = (event) => {
          this.currentUtterance = null;
          reject(new Error(`Educational TTS error: ${event.error}`));
        };

        // Store current utterance and start speaking
        this.currentUtterance = utterance;
        this.synth.speak(utterance);

      } catch (error) {
        reject(error);
      }
    });
  }

  addEducationalPauses(text) {
    // Add strategic pauses for better comprehension
    return text
      .replace(/\./g, '. ') // Pause after sentences
      .replace(/,/g, ', ') // Brief pause after commas
      .replace(/:/g, ': ') // Pause after colons
      .replace(/;/g, '; ') // Pause after semicolons
      .replace(/\?/g, '? ') // Pause after questions
      .replace(/!/g, '! '); // Pause after exclamations
  }

  findChildFriendlyVoice(voices, targetLang) {
    // Prioritize voices that sound more child-friendly
    const childFriendlyNames = [
      'samantha', 'karen', 'susan', 'allison', 'ava', 'serena',
      'female', 'woman', 'girl', 'child'
    ];

    // First try exact language match with child-friendly name
    for (const name of childFriendlyNames) {
      const voice = voices.find(v => 
        v.lang === targetLang && 
        v.name.toLowerCase().includes(name)
      );
      if (voice) return voice;
    }

    // Then try language code match with child-friendly name
    const langCode = targetLang.split('-')[0];
    for (const name of childFriendlyNames) {
      const voice = voices.find(v => 
        v.lang.startsWith(langCode) && 
        v.name.toLowerCase().includes(name)
      );
      if (voice) return voice;
    }

    // Fallback to any voice in the target language
    return this.findBestVoice(voices, targetLang);
  }
}

export default new TTSService();