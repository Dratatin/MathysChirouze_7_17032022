import { recipes } from "../data/recipes.js";
import { Recipes } from "./recipes.js";

let currentTabRecipes = recipes;
let filteredTabRecipes = "";

export function searchBarAlgo () {
    const inputData = document.querySelector("#search").value.toLowerCase();
    if (inputData.length > 2 ) {
        currentTabRecipes = recipes.filter(element => {
            const match = inputMatch (inputData, element);
            if (match == true) {
                return element;
            }
        });
        new Recipes (currentTabRecipes);
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


export function filtersAlgo () {
    const filtersDatas = Array.from(document.querySelectorAll(".tag button"));
    if (filtersDatas.length != 0) {
        filtersDatas.forEach(filterData => {
            filterMatch(filterData);
        });
        new Recipes (currentTabRecipes);
    }
    else {
        new Recipes(recipes);
    }
}

//looking for a match
function filterMatch (filterData) {
    const filterType = filterData.getAttribute("data-filtertype");
    filterData = filterData.innerText.toLowerCase();
    switch (filterType) {
        case "ingredients":
            currentTabRecipes = currentTabRecipes.filter(element => {
                const match = searchInIngredients (element, filterData);
                if (match == true) {
                    return true;
                }
            });
            break;
        case "appliances":
            currentTabRecipes = currentTabRecipes.filter(element => {
                const match = searchInAppliances (element, filterData);
                if (match == true) {
                    return true;
                }
            });
            break;
        case "ustensils":
            currentTabRecipes = currentTabRecipes.filter(element => {
                const match = searchInUstensils (element, filterData);
                if (match == true) {
                    return true;
                }
            });
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



// export function algo () {
//     const inputData = document.querySelector("#search").value.toLowerCase();
//     const filtersDatas = Array.from(document.querySelectorAll(".tag button"));

//     if (inputData.length > 2 && filtersDatas.length == 0) {
//         currentTabRecipes = recipes.filter(element => {
//             const match = inputMatch (inputData, element);
//             if (match == true) {
//                 return element;
//             }
//         });
//         new Recipes (currentTabRecipes);
//     }


//     else if ((inputData.length > 2 && filtersDatas.length != 0)) {
//     }

//     else if (inputData.length < 3 && filtersDatas.length != 0) {
//         filtersDatas.forEach(filterData => {
//             filterMatch(filterData);
//         }); 
//     }

//     else {
//         new Recipes (recipes);
//     }
// }