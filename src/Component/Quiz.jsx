import { useEffect, useState } from 'react';
import questionData from "./Quiz.json";
import "./Quiz.css";
function Quiz() {
  const [currentQues, setCurrentQues] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);
  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [timer, showScore]);
  const handleAnswer = (selectedOption) => {
    if (selectedOption === questionData[currentQues].correctOptions) {
      setScore((prevScore) => prevScore + 1);
    }
    handleNextQuestion();
  };
  const handleNextQuestion = () => {
    if (currentQues < questionData.length - 1) {
      setCurrentQues((prevQuestion) => prevQuestion + 1);
      setTimer(10);
    } else {
      setShowScore(true);
    }
  };
  const handleRestart = () => {
    if (score <= 0) {
      alert("Oops! Try again.");
    } else if (score === questionData.length) {
      alert("Wonderful! You got a perfect score!");
    }
    setCurrentQues(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  };
  return (
    <>
      <div className="quiz-app">
        {showScore ? (
          <div className="scoresec">
            <h2>Score: {score}/{questionData.length}</h2>
            <button onClick={handleRestart}>Restart</button>
          </div>
        ) : (
          <div className="quessec">
            <h2>Question {currentQues + 1}</h2>
            <p>{questionData[currentQues].questions}</p>
            <div className="options">
              {questionData[currentQues].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)}>{option}</button>
              ))}
            </div>
            <div className="timer">Time Left: <span>{timer}s</span></div>
          </div>
        )}
      </div>
    </>
  );
}
export default Quiz;
