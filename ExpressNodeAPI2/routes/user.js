const express = require('express')
const router = express.Router();
let recipes = require('../data.json')

// once you have a router page, you can change app.get to router.get

// data
const users = [{name: 'Tony', email: 'tony@mail.com'}]

const getAllRecipeNames = () => {
  const listOfRecipeNames = [];
  const recipeList = recipes.recipes;

  recipeList.forEach((recipe) => {
    listOfRecipeNames.push(recipe.name)
  });

  return listOfRecipeNames
}

// home route and response
router.get('/', (_, res) => {
  res.send('Your Express App');
});

// get only the recipe names
router.get('/recipes', (req, res) => {
  res.status(200).json({ recipeNames: getAllRecipeNames()})
})

// give param
// look through all users and return first match
router.get('/recipes/details/:id', (req, res) => {
  const query = req.params.id;
  const recipeList = recipes.recipes;
  const recipe = recipeList.filter((recipe) => recipe.name === query)[0];
  const ingredients = recipe.ingredients;
  const numSteps = recipe.instructions.length - 1
  res.status(200).json({ details: {ingredients, numSteps} })
})

// constructs new recipe from request body
// checks if they exist
// if they do then add it to the recipe list
// and send back the new list of recipes
router.post('/recipes', (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const recipeList = recipes.recipes;
  const recipeFound = getAllRecipeNames().includes(name);

  if(recipeFound) {
    res.status(400).json({ error: 'Recipe already exists' });
  }
  
  if (name && ingredients && instructions && !recipeFound) {
    recipeList.push({ name, ingredients, instructions });
    res.status(201).json({ recipes });
  }
})

router.put('/recipes', (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const recipeList = recipes.recipes;
  const recipeFound = getAllRecipeNames().includes(name);

  if(!recipeFound) {
    res.status(404).json({ error: 'Recipe does not exist' });
  }

  if (name && ingredients && instructions && recipeFound) {
    const index = getAllRecipeNames().indexOf(name);
    recipeList.splice(index, 1, { name, ingredients, instructions });
    res.status(204).json({ recipes });
  }
})

module.exports = router;