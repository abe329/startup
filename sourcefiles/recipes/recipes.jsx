import React, { useState } from 'react';
import './recipes.css';
import { useUserContext } from '../UserContext';

export function Recipes() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { updateUserScore } = useUserContext();
  const [expandedRecipes, setExpandedRecipes] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/recipes?ingredients=${ingredients}`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUseRecipe = async (recipeScore) => {
    await updateUserScore(recipeScore);
    console.log('Recipe used, score updated on server');
  };

  const toggleRecipeExpansion = (index) => {
    setExpandedRecipes(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <main>
      <h1 className="text-center">Find Recipes</h1>
      <form className="ingredientForm" onSubmit={handleSubmit}>
        <label htmlFor="ingredients">Enter your ingredient:</label>
        <input 
          type="text"
          className="ingredient-input"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="cheese" 
          required 
        />
        <button type="submit">Find Recipes</button>
      </form>

      <div className="api-generated-recipes">
        {recipes.length > 0 && <h2>Generated Recipes</h2>}
        {loading ? (
          <div className="loading">Loading recipes...</div>
        ) : (
          <div className="recipe-list">
            {recipes.map((recipe, index) => (
              <div key={index} className={`recipe-box ${expandedRecipes[index] ? 'expanded' : ''}`}>
                <h4>{recipe.title}</h4>
                <div className={`recipe-content ${expandedRecipes[index] ? 'expanded' : ''}`}>
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
                </div>
                {!expandedRecipes[index] && (
                  <button className="expand-btn" onClick={() => toggleRecipeExpansion(index)}>
                    Show More
                  </button>
                )}
                {expandedRecipes[index] && (
                  <button className="expand-btn" onClick={() => toggleRecipeExpansion(index)}>
                    Show Less
                  </button>
                )}
                <button className="use-recipe-btn" onClick={() => handleUseRecipe(recipe.score || 100)}>
                  Use This Recipe
                </button>
                <p className="recipe-score">Score: <span>{recipe.score || 100}</span> points</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}