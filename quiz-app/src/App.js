import React, { useState } from 'react';
import './App.css';

const questions = [
  {
    question: "What is React?",
    options: [
      "A framework for building mobile applications",
      "A library for managing backend databases",
      "A JavaScript library for building user interfaces",
      "A tool for compiling JavaScript",
    ],
    correctAnswer: "A JavaScript library for building user interfaces",
  },
  {
    question: "Which method is used to update the state in a functional component?",
    options: ["this.setState()", "useState()", "setState()", "useReducer()"],
    correctAnswer: "useState()",
  },
  {
    question: "What is JSX?",
    options: [
      "A JavaScript library",
      "A syntax extension for JavaScript",
      "A templating language",
      "A templating language",
    ],
    correctAnswer: "A syntax extension for JavaScript",
  },
  {
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "JavaScript Exchange",
      "JavaScript Extra",
      "JavaScript Extension",
    ],
    correctAnswer: "JavaScript XML",
  },
  {
    question: "What is a React key used for?",
    options: [
      "Styling elements",
      "Debugging components",
      "Uniquely identifying list items",
      "Updating props",
    ],
    correctAnswer: "Uniquely identifying list items",
  },
  {
    question: "Which React hook is used to perform side effects in a functional component?",
    options: ["useState()", "useEffect()", "useContext()", "useReducer()"],
    correctAnswer: "useEffect()",
  },
  {
    question: "What is the purpose of the props in React?",
    options: [
      "To manage local state in a component",
      "To pass data from one component to another",
      "To update the UI after user interactions",
      "To handle lifecycle events in components",
    ],
    correctAnswer: "To pass data from one component to another",
  },
  {
    question: "How do you pass data to a child component?",
    options: [
      "Using props",
      "Using state",
      "Using context",
      "Using hooks",
    ],
    correctAnswer:
      "Using props",
  },
  {
    question: "What is the default behavior of useEffect() if no dependencies are provided?",
    options: [
      "It does not run at all",
      "It runs once after the component is mounted",
      "It runs every time the component renders",
      "It runs only when manually triggered",
    ],
    correctAnswer: "It runs every time the component renders",
  },
  {
    question: "Which of the following is a valid way to conditionally render a component in React?",
    options: [
      "Using a switch statement",
      "Using an if statement inside JSX",
      "Using a ternary operator inside JSX",
      "Directly modifying the DOM",
    ],
    correctAnswer: "Using a ternary operator inside JSX",
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      { question: questions[currentQuestionIndex].question, answer: selectedAnswer },
    ]);
    setSelectedAnswer(null);
    if (currentQuestionIndex === questions.length - 1) {
      setQuizFinished(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    setSelectedAnswer(answers[currentQuestionIndex - 1]?.answer || null);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedAnswer(null);
    setAnswers([]);
  };

  return (
    <div className="App">
      <h1>React Quiz App</h1>

      {quizFinished ? (
        <div className="result">
          <h2>Congratulations!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          {score === questions.length ? (
            <p className="congrats-message">You got a perfect score! Well done!🎉</p>
          ) : (
            <p className="congrats-message">Good job! Keep learning!🚀</p>
          )}
          <div className="answers">
            <h3>Correct Answers:</h3>
            {questions.map((question, index) => (
              <div key={index}>
                <p><strong>{question.question}</strong></p>
                <p className={answers[index]?.answer === question.correctAnswer ? 'correct' : 'wrong'}>
                  Your Answer: {answers[index]?.answer || "No answer"}
                </p>
                <p><strong>Correct Answer: {question.correctAnswer}</strong></p>
                <hr />
              </div>
            ))}
          </div>
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div className="quiz">
          <h2>{questions[currentQuestionIndex].question}</h2>
          <div className="options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className={`option ${selectedAnswer === option ? 'selected' : ''}`}
                onClick={() => handleAnswerSelection(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="navigation-buttons">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            <button onClick={handleNextQuestion} disabled={!selectedAnswer}>
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
