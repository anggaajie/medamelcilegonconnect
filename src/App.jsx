import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Jobs from './pages/Jobs';
import Training from './pages/Training';
import Psychotest from './pages/Psikotes';
import Resume from './pages/Resume';
import Workforce from './pages/Workforce';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex bg-[#E9F1FA] dark:bg-[#E9F1FA] dark:text-dark-text transition-colors duration-200">
          <Sidebar />
          <main className="flex-1 ml-64 min-h-screen">
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/training" element={<Training />} />
              <Route path="/psychotest" element={<Psychotest />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/workforce" element={<Workforce />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;