import React, { useState } from 'react';
import './recipes.css';

export function Recipes() {
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Searching for recipes with:', ingredients);
    // Simulate loading
    setTimeout(() => setLoading(false), 2000);
  };

  const handleUseRecipe = () => {
    // Handles the "Use This Recipe" button click
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
            <div className="recipe-placeholder">
              <h4>Recipe Title</h4>
              <p>Ingredients: Placeholder ingredients</p>
              <p>Instructions: Placeholder instructions</p>
              <p className="recipe-score">Score: <span>100</span> points</p>
              <button className="use-recipe-btn" onClick={handleUseRecipe}>Use This Recipe</button>
            </div>
            <div className="recipe-placeholder">
              <h4>Another Recipe</h4>
              <p>Ingredients: More placeholder ingredients</p>
              <p>Instructions: More placeholder instructions</p>
              <p className="recipe-score">Score: <span>100</span> points</p>
              <button className="use-recipe-btn" onClick={handleUseRecipe}>Use This Recipe</button>
            </div>
            <div className="recipe-placeholder">
              <h4>Yet Another Recipe</h4>
              <p>Ingredients: Even more placeholder ingredients</p>
              <p>Instructions: Even more placeholder instructions</p>
              <p className="recipe-score">Score: <span>100</span> points</p>
              <button className="use-recipe-btn" onClick={handleUseRecipe}>Use This Recipe</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}