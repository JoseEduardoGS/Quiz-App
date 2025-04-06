import React, { useState } from 'react';

import RepasoSetup from './RepasoSetup';
import '../styles/Home.css';

const Home: React.FC = () => {
  const [mostrarRepaso, setMostrarRepaso] = useState(false);

  return (
    <div className="home-container">
      <h1>Guía Ceneval</h1>

      <div className="botones">
        <button onClick={() => window.location.href = '/quizSetup'}>Configurar Quiz</button>
        <button onClick={() => setMostrarRepaso(true)}>Repaso</button>
      </div>

      {mostrarRepaso && <RepasoSetup onClose={() => setMostrarRepaso(false)} />}
    </div>
  );
};

export default Home;
