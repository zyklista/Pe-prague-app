import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useStore from './store/useStore';

// Components
import AuthScreen from './components/Auth/AuthScreen';
import Dashboard from './components/Dashboard/Dashboard';
import ChatInterface from './components/Chat/ChatInterface';
import Settings from './components/Settings/Settings';
import ConversationHistory from './components/History/ConversationHistory';
import Layout from './components/Layout/Layout';

function App() {
  const { i18n } = useTranslation();
  const { 
    isAuthenticated, 
    settings, 
    checkTutorTime,
    updateSettings 
  } = useStore();

  useEffect(() => {
    // Set language from settings
    if (settings.language) {
      i18n.changeLanguage(settings.language);
    }

    // Check tutor time on app load and every minute
    checkTutorTime();
    const interval = setInterval(checkTutorTime, 60000);

    return () => clearInterval(interval);
  }, [settings.language, i18n, checkTutorTime]);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth" replace />;
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Routes>
        <Route 
          path="/auth" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthScreen />
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <Layout>
                <ChatInterface />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              <Layout>
                <ConversationHistory />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/" 
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
