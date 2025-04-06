// src/components/RepasoSetup.tsx
import React, { useState } from 'react';
import '../styles/QuizSetup.css'; // Puedes reutilizar los estilos
import { useNavigate } from 'react-router-dom';

const categorias = ['Primera Practica', 'Segunda Practica','Tercera Práctica','Cuarta Práctica', 'Todas las categorías'];

interface RepasoSetupProps {
  onClose: () => void;
}

const RepasoSetup: React.FC<RepasoSetupProps> = ({ onClose }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Cultura General');
  const navigate = useNavigate();

  const handleContinuar = () => {
    navigate('/repaso', { state: { categoria: categoriaSeleccionada } });
  };

  return (
    <div className="quiz-setup-overlay">
      <div className="quiz-setup-modal">
        <h2>Seleccionar Categoría</h2>

        <div className="categoria-botones">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`categoria-boton ${cat === categoriaSeleccionada ? 'seleccionado' : ''}`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="acciones">
          <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
          <button className="btn-empezar" onClick={handleContinuar}>Continuar</button>
        </div>
      </div>
    </div>
  );
};

export default RepasoSetup;
