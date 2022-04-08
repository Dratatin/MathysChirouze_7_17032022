import { recipes } from "../data/recipes.js";
import { Searchbar } from "./search.js";
import { Recipes } from "./recipes.js";
import { Filter } from "./filter.js";
import { getFilters } from "./getFilters.js";

class App {
    static init () {
        new App (recipes);
    }
    constructor (recipes) {
        this.recipes = recipes;
        this.launchSearchBar();
        this.launchFilters();
        this.launchRecipes();
    }
    launchSearchBar () {
        new Searchbar();
    }
    launchFilters () {
        const filtersList = new getFilters (this.recipes);
        const ingredients = filtersList.getIngredients();
        const appliances = filtersList.getAppliances();
        const ustensils = filtersList.getUstensils();

        new Filter(ingredients, document.querySelector("#ingredients"), "secondary");
        new Filter(appliances, document.querySelector("#appliances"), "tertiary");
        new Filter(ustensils, document.querySelector("#ustensils"), "quaternary"); 
    }    
    launchRecipes () {
        new Recipes(this.recipes);
    }
}

App.init();