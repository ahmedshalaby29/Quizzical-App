import axios from "axios";
import React, { useState, useEffect } from "react";
import Question from "./Question";

export default function StartQuiz({
  setSelectedCategory,
  setSelectedDifficulty,
  handleStartQuiz,
}) {
  const [categories, setCategories] = useState(getCategories);
  const [categoriesNames, setCategoriesNames] = useState([]);

  function handleDifficultyChange(e) {
    setSelectedDifficulty(e.target.value);
  }

  function handleCategoryChange(e) {
    console.log(categories);
    const index = categories.findIndex(
      (category) => category.name === e.target.value
    );
    setSelectedCategory(categories[index].id);
  }

  async function getCategories() {
    try {
      const response = await axios.get("https://opentdb.com/api_category.php");
      const categories = response.data.trivia_categories;
      setCategoriesNames(categories.map((category) => category.name));
      setCategories(categories);
      console.log(categories);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="startquiz-container">
      <h2 className="startquiz-title">Quizzical</h2>
      <Question
        question="Please select the questions category"
        showResults={false}
        handleChange={handleCategoryChange}
        correctAnswer=""
        answers={categoriesNames}
      />
      <Question
        question="Please select the questions difficulty"
        showResults={false}
        handleChange={handleDifficultyChange}
        correctAnswer=""
        answers={["Easy", "Medium", "Hard"]}
      />
      <button onClick={handleStartQuiz} className="startquiz-button">
        Start quiz
      </button>
    </div>
  );
}
