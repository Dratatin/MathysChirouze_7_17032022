import { recipes } from "../data/recipes.js";
import { Searchbar } from "./search.js";
import { Filters } from "./filters.js";
import { Recipes } from "./recipes.js";

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
        new Filters(this.recipes);   
    }    
    launchRecipes () {
        new Recipes(this.recipes);
    }
}

App.init();