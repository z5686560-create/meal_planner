import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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

            <div className="recipe-grid">
              {
                recipes.map((recipe) => (
                  <div className="recipe-card" key={recipe.idMeal} onClick={() => setSelectedRecipe(recipe)}>
                    <img 
                      src={recipe.strMealThumb}  
                      alt={recipe.strMeal}
                      width="200"
                    />

                    <h2>{recipe.strMeal}</h2>

                    <p>Category: {recipe.strCategory}</p>

                    <p>Area: {recipe.strArea}</p>
                  </div>
                ))
              }
            </div>

            {
              selectedRecipe && (
                <div
                  className="modal-overlay"
                  onClick={() => setSelectedRecipe(null)}
                >
                  <div 
                    className="modal"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2>{selectedRecipe.strMeal}</h2>

                    <img 
                      src={selectedRecipe.strMealThumb}
                      alt={selectedRecipe.strMeal}
                      style={{width: "100%"}}
                    />

                    <p>
                      <b>Category:</b> {selectedRecipe.strCategory}
                    </p>

                    <p>
                      <b>Area:</b> {selectedRecipe.strArea}
                    </p>

                    <p>{selectedRecipe.strInstructions}</p>

                    <button onClick={() => setSelectedRecipe(null)}>
                      Close
                    </button>
                  </div>
                </div>
              )
            }

        </div>
    );
}

export default App;