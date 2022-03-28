import { recipes } from "../data/recipes.js";
import { Recipe } from "./templates/recipe.js";

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

        // remove duplicates
        ingredients = ingredients.filter(function(element , position){
            return ingredients.indexOf(element) == position;
        })
        appliances = appliances.filter(function(element , position){
            return appliances.indexOf(element) == position;
        })
        ustensils = ustensils.filter(function(element , position){
            return ustensils.indexOf(element) == position;
        })

        new Filter(ingredients, document.querySelector("#ingredients"));
        new Filter(appliances, document.querySelector("#appliances"));
        new Filter(ustensils, document.querySelector("#ustensils"));
    }
    launchRecipes () {
        new Recipes(this.recipes);
    }
}

class Filter {
    constructor (filters, DOMfilter) {
        this.filters = filters;
        this.DOMfilter = DOMfilter;
        this.addFilter();
        this.addEventOpen();
    }
    addFilter () {
        this.filters.forEach(element => {
            const li = document.createElement("li");
            li.innerText = element;
            this.DOMfilter.querySelector("ul").appendChild(li);
        });
    }
    addEventOpen () {
        const input = this.DOMfilter.querySelector("input");
        const placeholder = input.placeholder;
        const filter = this.DOMfilter;
        this.DOMfilter.addEventListener("click", () => {
            document.addEventListener("click", function listShowed(e) {
                if (filter.contains(e.target)) {
                    const placeholderMin = placeholder.toLowerCase();
                    filter.querySelector("ul").classList.remove("filters__element__list--hide");
                    input.classList.add("filters__element__button__input--after");
                    input.placeholder = `Rechercher un ${placeholderMin}`;
                }
                else {
                    filter.querySelector("ul").classList.add("filters__element__list--hide");
                    input.classList.remove("filters__element__button__input--after");
                    input.placeholder = placeholder;
                    this.removeEventListener("click", listShowed);
                }
            })
        })
    }
}


class Recipes {
    constructor (recipes) {
        this.recipes = recipes;
        this.addRecipes();
    }
    addRecipes () {
        const resultSection = document.querySelector(".result-section");
        this.recipes.forEach(element => {
            const recipeDOM = new Recipe(element);
            resultSection.appendChild(recipeDOM.createRecipeBox());
        });
    }
}







App.init();