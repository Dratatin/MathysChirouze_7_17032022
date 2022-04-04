import { recipes } from "../data/recipes.js";
import { Recipes } from "./recipes.js";

let newTabRecipes = recipes;

export function searchBarAlgo (e) {
    if (e.target.value.length > 2 ) {
        const inputData = e.target.value.toLowerCase();
        newTabRecipes = newTabRecipes.filter(element => {
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

export function filtersAlgo (e) {
    const filterData = e.target.innerText.toLowerCase();
    const filterType = e.target.parentNode.parentNode.id;
    switch (filterType) {
        case "ingredients":
            newTabRecipes = newTabRecipes.filter(element => {
                const match = searchInIngredients (element, filterData);
                if (match == true) {
                    return element;
                }
            });
            new Recipes (newTabRecipes);
            break;
        case "appliances":
            newTabRecipes = newTabRecipes.filter(element => {
                const match = searchInAppliances (element, filterData);
                if (match == true) {
                    return element;
                }
            });
            new Recipes (newTabRecipes);
            break;
        case "ustensils":
            newTabRecipes = newTabRecipes.filter(element => {
                const match = searchInUstensils (element, filterData);
                if (match == true) {
                    return element;
                }
            });
            new Recipes (newTabRecipes);
            break;
    }
}



function searchInTitle (element, data) {
    return element.name.toLowerCase().includes(data);
}

function searchInIngredients (element, data) {
    return element.ingredients.some(element => {
        return element.ingredient.toLowerCase().includes(data) === true;
    });
}

function searchInAppliances (element, data) {
    return element.appliance.toLowerCase().includes(data);
}

function searchInUstensils (element, data) {
    return element.ustensils.some(element => {
        return element.toLowerCase().includes(data) === true;
    });
}

function searchInDescription (element, data) {
    element.description.toLowerCase().includes(data)
}