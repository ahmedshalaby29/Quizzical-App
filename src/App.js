import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import blob1 from "./images/blob1.png";
import blob2 from "./images/blob2.png";
import StartQuiz from "./components/StartQuiz";
import Question from "./components/Question";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("9");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [questionElements, setQuestionElements] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [answers, setAnswers] = useState({});

  async function getQuestions() {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=5&category=${selectedCategory}&difficulty=${selectedDifficulty.toLowerCase()}&type=multiple&encode=base64`
      );

      const questionsRawData = response.data.results;
      const questionsData = questionsRawData.map((data) => {
        const incorrect_answers = [];
        data.incorrect_answers.forEach((element) => {
          incorrect_answers.push(atob(element));
        });
        return {
          question: atob(data.question),
          correct_answer: atob(data.correct_answer),
          incorrect_answers: incorrect_answers,
          answers: insert(
            incorrect_answers,
            Math.ceil(Math.random() * 3),
            atob(data.correct_answer)
          ),
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
  async function startQuiz() {
    await getQuestions();
    setQuestionElements([]);
    setAnswers([]);

    setQuizStarted(true);
    setShowResults(false);
  }

  useEffect(() => {
    const elements = questions.map((question) => {
      return (
        <Question
          question={question.question}
          handleChange={onChange}
          showResults={showResults}
          correctAnswer={question.correct_answer}
          answers={question.answers}
        />
      );
    });
    setQuestionElements(elements);
    console.log(questions);
  }, [questions, showResults]);

  function checkAnswers() {
    let correctAnswers = 0;

    for (const question of questions) {
      let questionName = question.question;
      console.log(
        `question.correct_answer = ${question.correct_answer}  answers.questionName = ${answers[questionName]}`
      );

      if (question.correct_answer === answers[questionName])
        correctAnswers += 1;
    }

    setCorrectAnswers(correctAnswers);
    setShowResults(true);
    console.log(questions);
  }

  function onChange(e) {
    console.log("clicked");
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [e.target.name]: e.target.value,
    }));
  }

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  return (
    <div className="App">
      <img className="blob-img-1" src={blob1} />
      {!quizStarted && (
        <StartQuiz
          handleStartQuiz={startQuiz}
          setSelectedCategory={setSelectedCategory}
          setSelectedDifficulty={setSelectedDifficulty}
        />
      )}

      {quizStarted && (
        <div className="questions-container">
          {questionElements}
          <div className="checkAnswers-btn-container">
            {!showResults ? (
              <button className="checkAnswers-btn" onClick={checkAnswers}>
                Check answers
              </button>
            ) : (
              <div className="score-display-container">
                <h3 className="score-display">
                  You scored {correctAnswers}/5 correct answers
                </h3>
                <button
                  className="checkAnswers-btn play-again-btn"
                  onClick={startQuiz}
                >
                  Play again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <img className="blob-img-2" src={blob2} />
    </div>
  );
}

export default App;
