import React from "react";

export default function Question({ question, answers }) {
  const answersElements = answers.map((answer) => {
    return (
      <div className="answers-container">
        <input
          className="radio-input"
          name="answer"
          type="radio"
          value={answer}
        />
        <label className="radio-label">{answer}</label>
      </div>
    );
  });
  return (
    <div className="question-container">
      <h2 className="question-title">{question}</h2>
      {answersElements}
      <hr></hr>
    </div>
  );
}
