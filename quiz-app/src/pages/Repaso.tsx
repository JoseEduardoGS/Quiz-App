// src/pages/Repaso.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import preguntasData from '../data/preguntas.json';
import '../styles/Repaso.css';

const Repaso: React.FC = () => {
  const { state } = useLocation();
  const categoria = state?.categoria || 'Todas las categorías';

  const preguntas = categoria === 'Todas las categorías'
    ? preguntasData
    : preguntasData.filter(p => p.categoria === categoria);

  return (
    <div className="repaso-container">
      <h2>Repaso: {categoria}</h2>
      {preguntas.map((pregunta, idx) => (
        <div key={idx} className="pregunta">
          <p><strong>{idx + 1}. {pregunta.pregunta}</strong></p>
          <div className="opciones">
            {Array.isArray(pregunta.opciones) && pregunta.respuestaCorrecta && pregunta.opciones.map((opcion: string, i: number) => {
              const esCorrecta = opcion.trim().toLowerCase() === pregunta.respuestaCorrecta.trim().toLowerCase();
              return (
                <div
                  key={i}
                  className={`opcion ${esCorrecta ? 'correcta' : ''}`}
                >
                  {opcion}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Repaso;
