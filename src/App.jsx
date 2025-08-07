import React from 'react';
import Header from './components/Header';
import QuickLinks from './components/QuickLinks';
import ScheduleButton from './components/ScheduleButton';
import ConsularServices from './components/ConsularServices';
import BlogSocial from './components/BlogSocial';
import './index.css';

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <QuickLinks />
        <ScheduleButton />
        <ConsularServices />
        <BlogSocial />
      </main>
    </>
  );
}

export default App;
