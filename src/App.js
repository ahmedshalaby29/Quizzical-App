import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import blob1 from "./images/blob1.png";
import blob2 from "./images/blob2.png";
import StartQuiz from "./components/StartQuiz";
import Question from "./components/Question";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);

  async function getQuestions() {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=5&category=14&difficulty=medium&type=multiple&encode=base64"
      );
      const questionsRawData = response.data.results;
            console.log(response);
       
      const questionsData = questionsRawData.map((data) => {
        const incorrect_answers  = [];
        data.incorrect_answers.forEach(element => {
          incorrect_answers.push(atob(element))
        });
        return {
          question: atob(data.question),
          correct_answer: atob(data.correct_answer),
          incorrect_answers: incorrect_answers,
        };
      });
      setQuestions(questionsData);
    } catch (error) {
      console.log(error);
    }
  }
  const insert = (arr, index, val) => {
    const arrClone = [...arr];
    arrClone.splice(index, 0, val);
    return arrClone;
  };
  function startQuiz() {
    setQuizStarted(true);
    getQuestions();
  }

  const questionElements = questions.map((question) => {
    return (
      <Question
        question={question.question}
        answers={insert(
          question.incorrect_answers,
          Math.ceil(Math.random() * 3),
          question.correct_answer
        )}
      />
    );
  });

  function checkAnswers() {
    
  }

  return (
    <div className="App">
      <img className="blob-img-1" src={blob1} />
      {!quizStarted && <StartQuiz handleStartQuiz={startQuiz} />}

      {quizStarted && <React.Fragment>
        {questionElements}
        <button>Check answers</button>
      </React.Fragment>}
      <img className="blob-img-2" src={blob2} />
    </div>
  );
}

export default App;
