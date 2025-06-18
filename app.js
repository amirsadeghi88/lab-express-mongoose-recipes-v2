const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const RecipeModel = require("./models/Recipe.model");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
  RecipeModel.create(req.body)
    .then((createdRecipe) => {
      console.log("recipe created", createdRecipe);
      res.status(201).json(createdRecipe);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error creating a single recipe" });
    });
});
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  RecipeModel.find()
    .then((allRecipes) => {
      res.status(200).json(allRecipes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error finding all recipes" });
    });
});
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/one-recipe/:recipeId", (req, res) => {
  RecipeModel.findById(req.params.recipeId)
    .then((recipeId) => {
      res.status(200).json(recipeId);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error finding a single recipe" });
    });
});
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.patch("update-recipe/:recipeId", (req, res) => {
  RecipeModel.findByIdAndUpdate(req.params.recipeId, req.body, { new: true })
    .then((updatedRecipe) => {
      res.status(200).json(updatedRecipe);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error updating a single recipe" });
    });
});
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/delete-recipe/:recipeId", (req, res) => {
  RecipeModel.findByIdAndDelete(req.params.recipeId)
    .then((deletedRecipe) => {
      res.status(200).json(deletedRecipe);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error deleting a single recipe" });
    });
});
// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
