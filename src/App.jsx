import React, { useState, useEffect, useCallback } from "react";
import "./App.scss";
import menuIcon from "./Images/menu.svg";

const BASE_API_URL = "https://api.chucknorris.io";

function App() {
  const [isLoading, setIsLoding] = useState(false);
  const [joke, setJoke] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [jokeCategory, setJokeCategory] = useState("");
  const [isCategoryMenuVisible, setIsCategoryMenuVisible] = useState(true);

  console.log(isCategoryMenuVisible);

  const fetchJoke = useCallback(async () => {
    //function extracted from useEffect scope to be called by button
    try {
      setIsLoding(true);
      const response = await fetch(
        `${BASE_API_URL}/jokes/random${
          jokeCategory ? "?category=" + jokeCategory : ""
        }`
      );
      const data = await response.json();
      setJoke(data.value);
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setIsLoding(false);
    }
  }, [jokeCategory]);

  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${BASE_API_URL}/jokes/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setErrorMessage(error);
      }
    }
    fetchCategories();
  }, []);

  const CategoriesList = () => {
    return categories.map((category) => {
      return (
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
      );
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Roundhouse Kick</h1>
      </header>
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
        <div
          className={`category-field ${isCategoryMenuVisible ? "visible" : ""}`}
        >
          <CategoriesList />
        </div>
        <div
          className={`joke-field ${!isCategoryMenuVisible ? "stretch" : ""}`}
        >
          {isLoading ? <p>Loading...</p> : <p>{joke}</p>}
        </div>
        <div className="error-field">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </main>
      <footer className="App-footer">
        <p>
          Author:{" "}
          <a
            href="https://github.com/Adam-Karcz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Adam Karcz on GitHub"
          >
            Adam Karcz
          </a>
        </p>
        <p>
          Powered by:
          <a
            href="https://api.chucknorris.io/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Chuck Norris API website"
          >
            chucknorris.io
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
