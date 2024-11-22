import React, { useState } from 'react';
import './recipes.css';

export function Recipes() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/recipes?ingredients=${ingredients}`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUseRecipe = (recipeScore) => {
    setPlayerScore(prevScore => prevScore + recipeScore);
    console.log('Recipe used, new score:', playerScore + recipeScore);
  };

  return (
    <main>
      <h1 className="text-center">Find Recipes</h1>
      <h2 className="text-center">Total Score: {playerScore}</h2>
      <form className="ingredientForm" onSubmit={handleSubmit}>
        <label htmlFor="ingredients">Enter your ingredients:</label>
        <input 
          type="text"
          className="ingredient-input"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g., tomato, cheese, bread" 
          required 
        />
        <button type="submit">Find Recipes</button>
      </form>

      <div className="api-generated-recipes">
        <h2>Generated Recipes</h2>
        {loading ? (
          <div className="loading">Loading recipes...</div>
        ) : (
          <div className="recipe-list">
            {recipes.map((recipe, index) => (
              <div key={index} className="recipe-placeholder">
                <h4>{recipe.title}</h4>
                <h5>Ingredients:</h5>
                <ul>
                  {Array.isArray(recipe.ingredients)
                    ? recipe.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))
                    : typeof recipe.ingredients === 'string'
                    ? recipe.ingredients.split('|').map((ingredient, i) => (
                        <li key={i}>{ingredient.trim()}</li>
                      ))
                    : <li>No ingredients available</li>
                  }
                </ul>
                <h5>Instructions:</h5>
                  {Array.isArray(recipe.instructions) ? (
                    recipe.instructions.map((step, i) => (
                      <p key={i}>{step}</p>
                    ))
                  ) : typeof recipe.instructions === 'string' ? (
                    recipe.instructions.split('.').map((step, i) => {
                      const trimmedStep = step.trim();
                      return trimmedStep ? <p key={i}>{trimmedStep}</p> : null;
                    })
                  ) : (
                    <p>No instructions available</p>
                  )}
                <p className="recipe-score">Score: <span>{recipe.score || 100}</span> points</p>
                <button className="use-recipe-btn" onClick={() => handleUseRecipe(recipe.score || 100)}>Use This Recipe</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}