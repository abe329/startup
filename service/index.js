const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const cors = require('cors');
const axios = require('axios');
const config = require('./env.json');
console.log('API Key:', config.API_NINJAS_KEY);
const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', true);

const formatRecipe = (recipe) => {
  return {
    ...recipe,
    ingredients: recipe.ingredients.split('|').map(item => item.trim()),
    instructions: recipe.instructions.split('.').map(item => item.trim()).filter(item => item.length > 0)
  };
};

// Endpoint to fetch recipes
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

// Endpoint to fetch high scores from database
app.get('/api/highScores', async (req, res) => {
  try {
    const highScores = await DB.getHighScores();
    res.json(highScores);
  } catch (error) {
    console.error('Error fetching high scores:', error);
    res.status(500).json({ error: 'An error occurred while fetching high scores' });
  }
});

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Authentication endpoints
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// GetScores
secureApiRouter.get('/scores', async (req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

// SubmitScore
secureApiRouter.post('/score', async (req, res) => {
  const score = { ...req.body, ip: req.ip };
  await DB.addScore(score);
  const scores = await DB.getHighScores();
  res.send(scores);
});

//UpdateScore
secureApiRouter.post('/updateScore', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    // const newScore = req.body.score; //NEW
    await DB.updateUserScore(user.email, req.body.score); //update new score
    res.status(200).send({ msg: 'Score updated successfully' });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

//GetScore
secureApiRouter.get('/userScore', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    const score = await DB.getUserScore(user.email);
    res.status(200).send({ score: score });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});