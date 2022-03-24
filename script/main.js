import { recipes } from "../data/recipes.js";
import { Recipe } from "./templates/recipe.js";

class App {
    static init () {
        new App (recipes);
    }
    constructor (recipes) {
        this.recipes = recipes;
        this.recipeSection();
    }
    recipeSection () {
        new RecipeResult(this.recipes);
    }
}

class RecipeResult {
    constructor (recipes) {
        this.recipes = recipes;
        this.displayRecipes();
    }
    displayRecipes () {
        const resultSection = document.querySelector(".result-section");
        this.recipes.forEach(element => {
            const recipeDOM = new Recipe(element);
            resultSection.appendChild(recipeDOM.createRecipeBox());
        });
    }
}







App.init();