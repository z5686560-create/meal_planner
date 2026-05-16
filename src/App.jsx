import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
    const data = await response.json();

    console.log(data);

    setRecipes(data.meals);
  };
    return (
        <div>
            <h1>Recipe Meal Planner</h1>

            <input 
              type="text" 
              placeholder = "Search recipes.." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={fetchRecipes}>
              Search
            </button>

            {
              recipes.map((recipe) => (
                <div key={recipe.idMeal}>
                  <h2>{recipe.strMeal}</h2>
                </div>
              ))
            }
        </div>
    );
}

export default App;