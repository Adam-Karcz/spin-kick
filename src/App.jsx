import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

const BASE_API_URL = "https://api.chucknorris.io";

function App() {
  const [joke, setJoke] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [jokeCategory, setJokeCategory] = useState("");

  const fetchJoke = useCallback(async () => {
    //function extracted from useEffect scope to be called by button
    try {
      const response = await fetch(
        `${BASE_API_URL}/jokes/random${
          jokeCategory ? "?category=" + jokeCategory : ""
        }`
      );
      const data = await response.json();
      setJoke(data.value);
    } catch (error) {
      setErrorMessage(error);
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
        console.log(data);
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
        <button key={category} onClick={() => setJokeCategory(category)}>
          {category}
        </button>
      );
    });
  };

  console.log(jokeCategory);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spin Kick</h1>
      </header>
      <main>
        <button
          onClick={() => (jokeCategory ? setJokeCategory("") : fetchJoke())}
        >
          New totaly random joke
        </button>
        <p>{joke}</p>
        {errorMessage && <p>{errorMessage}</p>}
        <div>
          <CategoriesList />
        </div>
      </main>
    </div>
  );
}

export default App;
