import React, { useState, useEffect } from "react";
import "./App.css";

const BASE_API_URL = "https://api.chucknorris.io/jokes/";

function App() {
  const [joke, setJoke] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchJoke() {
      try {
        const response = await fetch(`${BASE_API_URL}random`);
        const data = await response.json();
        setJoke(data.value);
      } catch (error) {
        setErrorMessage(error);
      }
    }
    fetchJoke();
    async function fetchCategories() {
      try {
        const response = await fetch(`${BASE_API_URL}categories`);
        const data = await response.json();
        console.log(data);
        setCategories(data);
      } catch (error) {
        setErrorMessage(error);
      }
    }
    fetchCategories();
  }, []);
  console.log(categories);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spin Kick</h1>
      </header>
      <main>
        <p>{`${joke}`}</p>
        {errorMessage && <p>{`${errorMessage}`}</p>}
      </main>
    </div>
  );
}

export default App;
