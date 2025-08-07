import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      welcome: "Hi {{name}}, what's our subject today?",
      notTutorTime: "It's not yet tutor time",
      subjects: {
        math: "Mathematics",
        science: "Science", 
        english: "English",
        history: "History",
        geography: "Geography",
        art: "Art"
      },
      chat: {
        typeMessage: "Type your question...",
        send: "Send",
        listening: "Listening...",
        speaking: "Speaking...",
        uploadImage: "Upload Image"
      },
      auth: {
        signIn: "Sign In",
        signUp: "Sign Up",
        childName: "Child's Name",
        guardianName: "Guardian's Name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        enableVoiceAuth: "Enable voice recognition for verification?"
      },
      settings: {
        title: "Settings",
        tutorTime: "Tutor Time",
        startTime: "Start Time",
        endTime: "End Time",
        language: "Language",
        adultMode: "Adult Mode",
        privacy: "Privacy Settings"
      },
      avatar: {
        level: "Level {{level}}",
        points: "{{points}} points",
        upgrade: "Upgrade Available!"
      }
    }
  },
  tl: { // Tagalog
    translation: {
      welcome: "Hi {{name}}, ano ang aming paksa ngayon?",
      notTutorTime: "Hindi pa oras ng tutor",
      subjects: {
        math: "Matematika",
        science: "Agham",
        english: "Ingles",
        history: "Kasaysayan",
        geography: "Heograpiya",
        art: "Sining"
      },
      chat: {
        typeMessage: "I-type ang inyong tanong...",
        send: "Ipadala",
        listening: "Nakikinig...",
        speaking: "Nagsasalita...",
        uploadImage: "Mag-upload ng Larawan"
      },
      auth: {
        signIn: "Mag-sign In",
        signUp: "Mag-sign Up",
        childName: "Pangalan ng Bata",
        guardianName: "Pangalan ng Tagapag-alaga",
        email: "Email",
        password: "Password",
        confirmPassword: "Kumpirmahin ang Password",
        enableVoiceAuth: "I-enable ang voice recognition para sa verification?"
      }
    }
  },
  zh: { // Chinese
    translation: {
      welcome: "你好 {{name}}，今天我们学什么科目？",
      notTutorTime: "现在不是辅导时间",
      subjects: {
        math: "数学",
        science: "科学",
        english: "英语",
        history: "历史",
        geography: "地理",
        art: "艺术"
      },
      chat: {
        typeMessage: "输入你的问题...",
        send: "发送",
        listening: "正在听...",
        speaking: "正在说...",
        uploadImage: "上传图片"
      }
    }
  },
  cs: { // Czech
    translation: {
      welcome: "Ahoj {{name}}, jaký předmět si dnes vybereme?",
      notTutorTime: "Ještě není čas na doučování",
      subjects: {
        math: "Matematika",
        science: "Věda",
        english: "Angličtina", 
        history: "Historie",
        geography: "Zeměpis",
        art: "Umění"
      }
    }
  },
  fr: { // French
    translation: {
      welcome: "Salut {{name}}, quelle matière étudions-nous aujourd'hui ?",
      notTutorTime: "Ce n'est pas encore l'heure du tutorat",
      subjects: {
        math: "Mathématiques",
        science: "Sciences",
        english: "Anglais",
        history: "Histoire", 
        geography: "Géographie",
        art: "Art"
      }
    }
  },
  de: { // German
    translation: {
      welcome: "Hallo {{name}}, welches Fach nehmen wir heute?",
      notTutorTime: "Es ist noch nicht Zeit für Nachhilfe",
      subjects: {
        math: "Mathematik",
        science: "Naturwissenschaften",
        english: "Englisch",
        history: "Geschichte",
        geography: "Geografie", 
        art: "Kunst"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;