const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config({ path: '/Users/abehull/Desktop/cs260/startup/service/.env' });
console.log('API Key:', process.env.API_NINJAS_KEY);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const formatRecipe = (recipe) => {
  return {
    ...recipe,
    ingredients: recipe.ingredients.split('|').map(item => item.trim()),
    instructions: recipe.instructions.split('.').map(item => item.trim()).filter(item => item.length > 0)
  };
};

app.get('/api/recipes', async (req, res) => {
  try {
    const ingredients = req.query.ingredients;
    const limit = req.query.limit || 10; // Default to 10 if not specified
    console.log('Ingredients:', ingredients);
    
    if (!process.env.API_NINJAS_KEY) {
      throw new Error('API key is not set');
    }
    
    const response = await axios.get('https://api.api-ninjas.com/v1/recipe', {
      params: { query: ingredients },
      headers: { 'X-Api-Key': process.env.API_NINJAS_KEY }
    });
    
    console.log('API Response:', response.data);
    const formattedRecipes = response.data.map(formatRecipe);
    res.json(formattedRecipes);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while fetching recipes' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});