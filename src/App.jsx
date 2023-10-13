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
