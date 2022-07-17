import React from "react";

export default function StartQuiz({ handleStartQuiz }) {
  return (
    <div className="startquiz-container">
      <h2 className="startquiz-title">Quizzical</h2>
      <p className="startquiz-description">Some description if needed</p>
      <button onClick={handleStartQuiz} className="startquiz-button">
        Start quiz
      </button>
    </div>
  );
}
