import React, { useState, useEffect, useCallback } from "react";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { AppContent } from "./Components/AppContent";
import "./App.scss";

const BASE_API_URL = "https://api.chucknorris.io";

function App() {
  const [isLoading, setIsLoding] = useState(false);
  const [joke, setJoke] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [jokeCategory, setJokeCategory] = useState("");
  const [isCategoryMenuVisible, setIsCategoryMenuVisible] = useState(true);
  const networkErrorMessage =
    "You failed to fetch joke due to a network error, no Chuck for you.";
  const serverErrorMessage =
    "You've been roundhouse kicked! You failed to fetch";

  const fetchJoke = useCallback(async () => {
    //function extracted from useEffect scope to be called by button
    try {
      setIsLoding(true);
      const response = await fetch(
        `${BASE_API_URL}/jokes/random${
          jokeCategory ? "?category=" + jokeCategory : ""
        }`
      );

      if (!response.ok) {
        const text = await response.text();
        console.error(`Error: ${response.status} - ${text}`);
        setErrorMessage(
          `Error: ${response.status} ${serverErrorMessage} joke.`
        );
        return;
      }
      const data = await response.json();
      setJoke(data.value);
    } catch (error) {
      setErrorMessage(networkErrorMessage);
    } finally {
      setIsLoding(false);
    }
  }, [jokeCategory, serverErrorMessage]);

  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${BASE_API_URL}/jokes/categories`);
        if (!response.ok) {
          setErrorMessage(
            `Error: ${response.status} ${serverErrorMessage} jokes categories.`
          );
          return;
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setErrorMessage(networkErrorMessage);
      }
    }
    fetchCategories();
  }, [serverErrorMessage]);

  console.log(errorMessage);

  return (
    <div className="App">
      <Header />
      <AppContent
        categories={categories}
        jokeCategory={jokeCategory}
        setJokeCategory={setJokeCategory}
        fetchJoke={fetchJoke}
        isCategoryMenuVisible={isCategoryMenuVisible}
        setIsCategoryMenuVisible={setIsCategoryMenuVisible}
        joke={joke}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
      <Footer />
    </div>
  );
}

export default App;
