const express = require("express");
const { getRecipeForm, postRecipe } = require("./handlers/recipe");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.get("/recipe", getRecipeForm);
app.post("/recipe", postRecipe);
app.listen(3000, () => console.log("Server is running on port 3000!"));