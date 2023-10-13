import React from "react";
import { CategoriesList } from "../Components/CategoriesList";
import menuIcon from "../Images/menu.svg";

export const AppContent = ({
  setIsCategoryMenuVisible,
  isCategoryMenuVisible,
  jokeCategory,
  setJokeCategory,
  fetchJoke,
  errorMessage,
  categories,
  isLoading,
  joke,
}) => (
  <main className="App-content">
    <div className="reload-field">
      <button
        className="show-categories"
        type="button"
        aria-label="Show menu"
        onClick={() => setIsCategoryMenuVisible(!isCategoryMenuVisible)}
      >
        <img src={menuIcon} alt="hamburger menu" />
      </button>
      <button
        type="button"
        aria-label="Random joke of any category"
        onClick={() => (jokeCategory ? setJokeCategory("") : fetchJoke())}
      >
        {!errorMessage ? "New totaly random joke" : "Try again!"}
      </button>
    </div>

    <CategoriesList
      isCategoryMenuVisible={isCategoryMenuVisible}
      categories={categories}
      jokeCategory={jokeCategory}
      setJokeCategory={setJokeCategory}
      fetchJoke={fetchJoke}
    />

    <div className={`joke-field ${!isCategoryMenuVisible ? "stretch" : ""}`}>
      {isLoading ? <p>Loading...</p> : <p>{joke}</p>}
    </div>
    <div className="error-field">{errorMessage && <p>{errorMessage}</p>}</div>
  </main>
);
