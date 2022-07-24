import React, { useState } from "react";
import classNames from "classnames";

export default function Question({
  question,
  showResults,
  handleChange,
  correctAnswer,
  answers,
}) {
  const [checkedAnswer, setCheckedAnswer] = useState("");

  const answersElements = answers.map((answer) => {
    return (
      <div className="answer-container">
        <input
          id={answer}
          className="radio-input"
          name={question}
          type="radio"
          value={answer}
          onChange={(event) => {
            if (!showResults) {
              handleChange(event);
              setCheckedAnswer(answer);
            }
          }}
          checked={answer === checkedAnswer}
        />
        <label
          htmlFor={answer}
          className={classNames({
            correctAnswer: showResults && answer === correctAnswer,
            wrongAnswer:
              answer === checkedAnswer &&
              showResults &&
              answer !== correctAnswer,
            unselectedAnswer:
              answer !== checkedAnswer &&
              showResults &&
              answer !== correctAnswer,
            radioLabel: true,
          })}
        >
          {answer}
        </label>
      </div>
    );
  });
  return (
    <div className="question-container">
      <h2 className="question-title">{question}</h2>
      <div className="answers-container">{answersElements}</div>
      <hr className="question-line"></hr>
    </div>
  );
}
