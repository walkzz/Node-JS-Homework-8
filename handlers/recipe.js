const fs = require("fs");
const getRecipeForm = async (req, res) => {
  try {
    let output = await parseTemplate("recipe_form");
    res.status(200).send(output);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error!");
  }
};

const postRecipe = async (req, res) => {
  const { name, ingredients } = req.body;

  if (!name || !ingredients) {
    return res.status(400).send("Bad request!");
  }

  try {
    let output = await parseTemplate("recipe", {
      name,
      ingredients: Array.isArray(ingredients) ? ingredients.join(", ") : ingredients,
    });
    res.status(200).send(output);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const parseTemplate = async (template, data = null) => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      `${__dirname}/../views/${template}.html`,
      "utf-8",
      (err, content) => {
        if (err) reject(err);
        if (data) {
          for (const key in data) {
            content = content.replace(`{{${key}}}`, data[key]);
          }
        }
        return resolve(content);
      }
    );
  });
};

module.exports = {
  getRecipeForm,
  postRecipe,
};