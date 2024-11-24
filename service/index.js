const express = require('express');
const cors = require('cors');
const axios = require('axios');
const uuid = require('uuid');
// require('dotenv').config({ path: '/env.json' });
const config = require('./env.json');
console.log('API Key:', config.API_NINJAS_KEY);

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const users = {}; //maybe update later with a database..?

app.use(cors());
app.use(express.static('public'));
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
    const limit = req.query.limit || 10; // Limit to 10
    console.log('Ingredients:', ingredients);
    
    if (!config.API_NINJAS_KEY) {
      throw new Error('API key is not set');
    }
    
    const response = await axios.get('https://api.api-ninjas.com/v1/recipe', {
      params: { query: ingredients },
      headers: { 'X-Api-Key': config.API_NINJAS_KEY }
    });
    
    console.log('API Response:', response.data);
    const formattedRecipes = response.data.map(formatRecipe);
    res.json(formattedRecipes);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while fetching recipes' });
  }
});

// Authentication endpoints
app.post('/auth/create', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
    users[user.email] = user;
    res.send({ token: user.token });
  }
});

app.post('/auth/login', async (req, res) => {
  const user = users[req.body.email];
  if (user && req.body.password === user.password) {
    user.token = uuid.v4();
    res.send({ token: user.token });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

app.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});