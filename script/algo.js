import { recipes } from "../data/recipes.js";
import { Recipes } from "./recipes.js";

export function algo (e) {
    if (e.target.value.length > 2 ) {
        const inputData = e.target.value.toLowerCase();
        const newTabRecipes = recipes.filter(element => {
            const match = inputMatch (inputData, element);
            if (match == true) {
                return element;
            }
        });
        new Recipes (newTabRecipes);
    }
    else {
        new Recipes (recipes);
    }
}
//looking for a match
function inputMatch (inputData, element) {
    const findInTitle = element.name.toLowerCase().includes(inputData);
    const findInDescription = element.description.toLowerCase().includes(inputData);
    const findInIngredients = element.ingredients.some(element => {
        return element.ingredient.toLowerCase().includes(inputData) === true;
    });
    if (findInTitle || findInDescription || findInIngredients == true) {
        return true;
    }
    else {
        return false;
    }
}

function filters () {

}

function findInTitle (element, data) {

}

function findInIngredients (element, data) {

}

function findInAppliances (element, data) {

}

function findInUstensils (element, data) {

}