import { recipes } from "../../data/recipes.js";
import { List } from "../filter.js";
import { getFilters } from "../getFilters.js";
import { Recipes } from "../recipes.js";

let currentTabRecipes = recipes;
let filteredRecipes = recipes;
let searchedRecipes = recipes;

export function searchBarAlgo () {
    const inputData = document.querySelector("#search").value.toLowerCase();
    const filtersDatas = Array.from(document.querySelectorAll(".tag button"));
    if (inputData.length > 2) {
        let result = [];
        for (const element of filteredRecipes) {
            const match = inputMatch (inputData, element);
            if (match == true) {
                result.push(element);
            }
        }
        searchedRecipes = result;
        if (searchedRecipes.length != 0) {
            new Recipes (searchedRecipes);
            newFiltersList (searchedRecipes);
        }
        else {
            const resultSection = document.querySelector(".result-section");
            resultSection.innerHTML = `<div class="result-section__empty">Aucune recette ne correspond à votre critère… vous pouvez
            chercher « tarte aux pommes », « poisson », etc...</div>`;
        }
        currentTabRecipes = searchedRecipes;
    }
    else if (inputData.length < 3 && filtersDatas.length === 0) {
        currentTabRecipes = recipes;
        searchedRecipes = recipes;
        new Recipes (recipes);
        newFiltersList (recipes);
    }
    else {
        searchedRecipes = recipes;
        currentTabRecipes = recipes;
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
    if (filtersDatas.length != 0) {
        for (const filterData of filtersDatas) {
            filterMatch(filterData);
        }
        new Recipes (currentTabRecipes);
        newFiltersList(currentTabRecipes);
        filteredRecipes = currentTabRecipes;
        currentTabRecipes = searchedRecipes;
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
    if (filterType === "ingredients") {
        let result = [];
        for (const element of currentTabRecipes) {
            const match = searchInIngredients (element, tagData);
            if (match == true) {
                result.push(element)
            }
        }
        currentTabRecipes = result;
    }
    else if (filterType === "appliances") {
        let result = [];
        for (const element of currentTabRecipes) {
            const match = searchInAppliances (element, tagData);
            if (match == true) {
                result.push(element)
            }
        }
        currentTabRecipes = result;
    }
    else if (filterType === "ustensils") {
        let result = [];
        for (const element of currentTabRecipes) {
            const match = searchInUstensils (element, tagData);
            if (match == true) {
                result.push(element)
            }
        }
        currentTabRecipes = result;
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
    const tabIngredients = element.ingredients;
    const patern = new RegExp(`^${data}$`);
    for (const elem of tabIngredients) {
        if (patern.test(elem.ingredient.toLowerCase())) {
            return true
        }
    }
}

function searchInAppliances (element, data) {
    return element.appliance.toLowerCase().includes(data);
}

function searchInUstensils (element, data) {
    const tabUstensils = element.ustensils;
    for (const elem of tabUstensils) {
        if (elem.toLowerCase().includes(data)) {
            return true
        }
    }
}

function searchInDescription (element, data) {
    return element.description.toLowerCase().includes(data)
}