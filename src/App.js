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
      const respone = await axios.get(
        "https://opentdb.com/api.php?amount=5&category=14&difficulty=medium&type=multiple"
      );
      console.log(respone);
      const questionsRawData = respone.data.results;
      const questionsData = questionsRawData.map((data) => {
        return {
          question: data.question,
          correct_answer: data.correct_answer,
          incorrect_answers: data.incorrect_answers,
        };
      });
      console.log(questionsData);
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
  return (
    <div className="App">
      <img className="blob-img-1" src={blob1} />
      {!quizStarted && <StartQuiz handleStartQuiz={startQuiz} />}

      {quizStarted && <React.Fragment>{questionElements}</React.Fragment>}
      <img className="blob-img-2" src={blob2} />
    </div>
  );
}

export default App;
