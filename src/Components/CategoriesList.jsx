import React from "react";
import "./Styles/CategoriesList.scss";

export const CategoriesList = ({
  isCategoryMenuVisible,
  categories,
  jokeCategory,
  setJokeCategory,
  fetchJoke,
}) => {
  return (
    <div className={`category-field ${isCategoryMenuVisible ? "visible" : ""}`}>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          aria-label={`Random joke from ${category} category`}
          onClick={() =>
            jokeCategory !== category ? setJokeCategory(category) : fetchJoke()
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
};
