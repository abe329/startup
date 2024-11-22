import React, { useState } from 'react';
import './recipes.css';

export function Recipes() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleUseRecipe = () => {
    console.log('Recipe used');
  };

  return (
    <main>
      <h1 className="text-center">Find Recipes</h1>
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
                    <ol>
                      {recipe.instructions.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  ) : typeof recipe.instructions === 'string' ? (
                    <ol>
                      {recipe.instructions.split('.').map((step, i) => {
                        const trimmedStep = step.trim();
                        return trimmedStep ? <li key={i}>{trimmedStep}</li> : null;
                      })}
                    </ol>
                  ) : (
                    <p>No instructions available</p>
                  )}
                <p className="recipe-score">Score: <span>100</span> points</p>
                <button className="use-recipe-btn" onClick={handleUseRecipe}>Use This Recipe</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}