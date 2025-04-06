import React, { useState, useEffect } from 'react';
import '../styles/QuizSetup.css';
import { useNavigate } from 'react-router-dom';
import preguntasData from '../data/preguntas.json'; // Suponiendo que tienes el JSON en la carpeta 'data'

interface QuizSetupProps {
  totalPreguntas: number;
  onClose: () => void; // Esta función cierra el modal
}

const categorias = ['Primera Práctica', 'Segunda Práctica','Tercera Práctica', 'Cuarta Práctica', 'Todas las categorías'];

const QuizSetup: React.FC<QuizSetupProps> = ({ totalPreguntas, onClose }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Cultura General');
  const [cantidad, setCantidad] = useState<number>(1);
  const [maxPreguntas, setMaxPreguntas] = useState<number>(0); // Para almacenar el máximo de preguntas según la categoría
  const navigate = useNavigate();

  // Función para obtener las preguntas de la categoría seleccionada
  const getPreguntasPorCategoria = (categoria: string) => {
    if (categoria === 'Todas las categorías') {
      return preguntasData; // Todas las preguntas
    }
    return preguntasData.filter((pregunta) => pregunta.categoria === categoria);
  };

  const handleStart = () => {
    if (!categoriaSeleccionada || cantidad < 1) return;

    // Obtener las preguntas de la categoría seleccionada
    let preguntas = getPreguntasPorCategoria(categoriaSeleccionada);

    // Si la cantidad es menor que el número de preguntas, seleccionamos aleatoriamente
    if (cantidad < preguntas.length) {
      preguntas = shuffleArray(preguntas).slice(0, cantidad); // Barajamos y tomamos las primeras 'cantidad' preguntas
    }

    // Navegar a la pantalla del quiz con las preguntas seleccionadas
    navigate('/quiz', {
      state: {
        categoria: categoriaSeleccionada,
        cantidad,
        preguntasSeleccionadas: preguntas, // Pasamos las preguntas aleatorias
      },
    });
  };

  // Función para barajar las preguntas de forma aleatoria
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
    return array;
  };

  useEffect(() => {
    // Actualizar el máximo de preguntas cuando cambie la categoría
    const maxPreguntas = getPreguntasPorCategoria(categoriaSeleccionada).length;
    setMaxPreguntas(maxPreguntas);
    // Asegurarse de que la cantidad seleccionada no supere el máximo disponible
    if (cantidad > maxPreguntas) {
      setCantidad(maxPreguntas);
    }
  }, [categoriaSeleccionada]);

  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaCantidad = Number(e.target.value);
    // Limitar la cantidad a la cantidad máxima disponible
    if (nuevaCantidad <= maxPreguntas) {
      setCantidad(nuevaCantidad);
    }
  };

  return (
    <div className="quiz-setup-overlay">
      <div className="quiz-setup-modal">
        <h2>Configurar Quiz</h2>

        <div className="categoria-selector">
          <h3>Categoría</h3>
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
        </div>

        <div className="cantidad-selector">
          <h3>Cantidad de preguntas</h3>
          <input
            type="number"
            min={1}
            max={maxPreguntas}
            value={cantidad}
            onChange={handleCantidadChange}
          />
          <p className="cantidad-max">Máximo: {maxPreguntas}</p>
        </div>

        <div className="acciones">
        <button className="btn-cancelar" onClick={() => navigate('/')}>Cancelar</button>

          <button
            className="btn-empezar"
            onClick={handleStart}
            disabled={!categoriaSeleccionada || cantidad < 1 || cantidad > maxPreguntas}
          >
            Empezar
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSetup;
