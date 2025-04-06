import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Quiz.css';

const Quiz: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { categoria, cantidad, preguntasSeleccionadas }: { categoria: string, cantidad: number, preguntasSeleccionadas: any[] } = location.state || { categoria: 'Cultura General', cantidad: 1, preguntasSeleccionadas: [] };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  {/*const [feedback, setFeedback] = useState<string>('');*/}
  const [answered, setAnswered] = useState<boolean>(false);
  const [answersStatus, setAnswersStatus] = useState<string[]>([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Para contar respuestas correctas
  const [showResults, setShowResults] = useState(false); // Para mostrar el popup de resultados

  const currentPregunta = preguntasSeleccionadas[currentQuestion];

  const handleAnswerSelect = (answer: string) => {
    if (!answered) {
      setSelectedAnswer(answer);
    }
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const correctAnswer = currentPregunta.respuestaCorrecta;
      const newAnswersStatus = [...answersStatus];
      newAnswersStatus[currentQuestion] = selectedAnswer === correctAnswer ? 'correcta' : 'incorrecta';
      setAnswersStatus(newAnswersStatus);
      
      // Incrementar el contador de respuestas correctas
      if (selectedAnswer === correctAnswer) {
        setCorrectAnswersCount(correctAnswersCount + 1);
      }

      /*setFeedback(selectedAnswer === correctAnswer ? 'Correcto' : 'Incorrecto');*/
      setAnswered(true);
    }
  };

  const handleContinue = () => {
    if (currentQuestion < preguntasSeleccionadas.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      /*setFeedback('');*/
      setAnswered(false);
    } else {
      // Cuando llegamos a la última pregunta, mostramos los resultados
      setShowResults(true);
    }
  };

  const handleFinish = () => {
    // Navegar de vuelta a la página principal
    navigate('/');
  };

  return (
    <div className="allcontainer-Quiz">
        
    <div className="quiz-container">
      
      <h3>{currentPregunta.pregunta}</h3>

      <div className="opciones">
        {currentPregunta.opciones.map((opcion, index) => {
          const isSelected = selectedAnswer === opcion;
          const isCorrect = opcion === currentPregunta.respuestaCorrecta;
          const isIncorrect = selectedAnswer === opcion && !isCorrect;

          return (
            <button
              key={index}
              className={`opcion
                ${isSelected && answered ? 'seleccionada' : ''} 
                ${isCorrect && answered ? 'correcta' : ''} 
                ${isIncorrect && answered ? 'incorrecta' : ''} 
              `}
              onClick={() => handleAnswerSelect(opcion)}
              disabled={answered}
            >
              {opcion}
            </button>
          );
        })}
      </div>

    {/*
      <div className="feedback">
        {feedback && (
          <p className={feedback === 'Correcto' ? 'feedback.correcto' : 'feedback.incorrecto'}>
            {feedback}
          </p>
        )}
      </div>
        */}

      <div className="acciones">
        {answered ? (
            <div className="boton-preguntas">
                <p>Pregunta {currentQuestion + 1} de {preguntasSeleccionadas.length}</p>
          <button className="btn-continuar" onClick={handleContinue}>Continuar</button>
          </div>
        ) : (
            <div className="boton-preguntas">
                    <p>Pregunta {currentQuestion + 1} de {preguntasSeleccionadas.length}</p>

                    <button
  onClick={handleNext}
  disabled={!selectedAnswer}
  className={selectedAnswer ? "btn-activo" : "btn-inactivo"}
>
  Responder
</button>

          </div>
        )}
      </div>

      {showResults && (
        <div className="overlay-resultados">
        <div className="resultado-popup">
          <h3>Resultados</h3>
          <p>
            Respuestas correctas: <br></br><br></br>{correctAnswersCount} de {preguntasSeleccionadas.length}
          </p>
          <button onClick={handleFinish}>Terminar</button>
        </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Quiz;
