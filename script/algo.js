import { recipes } from "../data/recipes.js";
import { Recipes } from "./recipes.js";

let newTabRecipes = recipes;

export function searchBarAlgo (e) {
    if (e.target.value.length > 2 ) {
        const inputData = e.target.value.toLowerCase();
        newTabRecipes = recipes.filter(element => {
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
    const findInTitle = searchInTitle(element, inputData);
    const findInDescription = searchInDescription(element, inputData);
    const findInIngredients = searchInIngredients(element, inputData);
    if (findInTitle || findInDescription || findInIngredients == true) {
        return true;
    }
    else {
        return false;
    }
}

export function filtersAlgo (e, filterType) {
    console.log(e.target);
}

function searchInTitle (element, data) {
    return element.name.toLowerCase().includes(data);
}

function searchInIngredients (element, data) {
    return element.ingredients.some(element => {
        return element.ingredient.toLowerCase().includes(data) === true;
    });
}

function findInAppliances (element, data) {

}

function findInUstensils (element, data) {

}

function searchInDescription (element, data) {
    element.description.toLowerCase().includes(data)
}