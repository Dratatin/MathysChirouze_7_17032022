import { recipes } from "../../data/recipes.js";
import { List } from "../filter.js";
import { getFilters } from "../getFilters.js";
import { Recipes } from "../recipes.js";

let currentTabRecipes = recipes;
let filteredRecipes = recipes;

export function searchBarAlgo () {
    const inputData = document.querySelector("#search").value.toLowerCase();
    const filtersDatas = Array.from(document.querySelectorAll(".tag button"));
    if (inputData.length > 2) {
        let result = filteredRecipes.filter(element => {
            const match = inputMatch (inputData, element);
            if (match == true) {
                return element;
            }
        });
        if (result.length != 0) {
            new Recipes (result);
            newFiltersList (result);
        }
        else {
            const resultSection = document.querySelector(".result-section");
            resultSection.innerHTML = `<div class="result-section__empty">Aucune recette ne correspond à votre critère… vous pouvez
            chercher « tarte aux pommes », « poisson », etc...</div>`;
        }
    }
    else if (inputData.length < 3 && filtersDatas.length === 0) {
        new Recipes (recipes);
        newFiltersList (recipes);
    }
    else {
        filtersAlgo();
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


export function filtersAlgo () {
    const filtersDatas = Array.from(document.querySelectorAll(".tag button"));
    if (filtersDatas != 0) {
        filtersDatas.forEach(filterData => {
            filterMatch(filterData);
        }); 
        new Recipes (currentTabRecipes);
        newFiltersList(currentTabRecipes);
        filteredRecipes = currentTabRecipes;
        currentTabRecipes = recipes;
    }
    else  {
        filteredRecipes = recipes;
        searchBarAlgo();
    }
}

//looking for a match
function filterMatch (tagData) {
    const filterType = tagData.getAttribute("data-filtertype");
    tagData = tagData.innerText.toLowerCase();
    switch (filterType) {
        case "ingredients":
            currentTabRecipes = currentTabRecipes.filter(element => {
                const match = searchInIngredients (element, tagData);
                if (match == true) {
                    return true;
                }
            });
            break;
        case "appliances":
            currentTabRecipes = currentTabRecipes.filter(element => {
                const match = searchInAppliances (element, tagData);
                if (match == true) {
                    return true;
                }
            });
            break;
        case "ustensils":
            currentTabRecipes = currentTabRecipes.filter(element => {
                const match = searchInUstensils (element, tagData);
                if (match == true) {
                    return true;
                }
            });
            break;
    }
}


function newFiltersList (recipes) {
    const filtersList = new getFilters (recipes);
    const ingredients = filtersList.getIngredients();
    const appliances = filtersList.getAppliances();
    const ustensils = filtersList.getUstensils();

    const ingredientsDOM = document.querySelector("#ingredients");
    const appliancesDOM = document.querySelector("#appliances");
    const ustensilsDOM = document.querySelector("#ustensils");

    new List (ingredientsDOM, ingredients, "secondary");
    new List (appliancesDOM, appliances, "tertiary");
    new List (ustensilsDOM, ustensils, "quaternary");
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