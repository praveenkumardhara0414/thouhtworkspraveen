import { useEffect, useState } from "react";
import "./styles.css";
import Hello from "./page";

export default function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSerach, setIsSerach] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
      );
      const result = await response.json();
      // Check if the response contains the expected data
      if (result.meals) {
        setData(result.meals);
      } else {
        console.error("Unexpected response format:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [inputValue]);

  const changeInput = (event) => {
    setInputValue(event.target.value);
  };

  const clickMeal = (event) => {};

  return (
    <div className="App">
      <input
        value={inputValue}
        placeholder="Enter Meal to search"
        onChange={changeInput}
        className="input"
      />
      <div className="App1">
        {data.length > 0 ? (
          data.map((meal) => (
            <div key={meal.idMeal} className="container" onClick={clickMeal}>
              <h1>{meal.strMeal}</h1>
              <img
                src={meal.strMealThumb}
                className="image"
                alt={meal.strMeal}
              />
              <p className="para">{meal.strInstructions}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
