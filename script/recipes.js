import { Recipe } from "./templates/recipe.js";

export class Recipes {
    constructor (recipes) {
        this.recipes = recipes;
        this.addRecipes();
    }
    addRecipes () {
        const resultSection = document.querySelector(".result-section");
        resultSection.innerHTML = "";
        this.recipes.forEach(element => {
            const recipeDOM = new Recipe(element);
            resultSection.appendChild(recipeDOM.createRecipeBox());
        });
    }
}