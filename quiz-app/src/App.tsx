// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import QuizSetup from './components/QuizSetup';
import Quiz from './pages/Quiz';
import Repaso from './pages/Repaso';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quizSetup" element={<QuizSetup totalPreguntas={15} onClose={() => {}} />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/repaso" element={<Repaso />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
