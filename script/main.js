import { recipes } from "../data/recipes.js";
import { Filter } from "./filters.js";
import { Recipes } from "./recipes.js";

class App {
    static init () {
        new App (recipes);
    }
    constructor (recipes) {
        this.recipes = recipes;
        this.launchFilters();
        this.launchRecipes();
    }
    launchFilters () {
        let ingredients = [];
        let appliances = [];
        let ustensils = [];
        this.recipes.forEach(recipe => {
            recipe.ingredients.forEach(element => {
                ingredients.push(element.ingredient.charAt(0).toUpperCase() + element.ingredient.slice(1));
            });
            appliances.push(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1));
            recipe.ustensils.forEach(element => {
                ustensils.push(element.charAt(0).toUpperCase() + element.slice(1));
            });
        });

        ingredients = removeDuplicates(ingredients);
        appliances = removeDuplicates(appliances);
        ustensils = removeDuplicates(ustensils);

        function removeDuplicates (tags) {
            const result = tags.filter((element , position) => {
                return tags.indexOf(element) == position;
            })
            return result;
        }

        new Filter(ingredients, document.querySelector("#ingredients"), "secondary");
        new Filter(appliances, document.querySelector("#appliances"), "tertiary");
        new Filter(ustensils, document.querySelector("#ustensils"), "quaternary");
    }
    launchRecipes () {
        new Recipes(this.recipes);
    }
}

App.init();