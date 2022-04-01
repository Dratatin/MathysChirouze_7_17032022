import { recipes } from "../data/recipes.js";
import { Recipes } from "./recipes.js";

export function algo (e) {
    if (e.target.value.length > 2 ) {
        const inputData = e.target.value.toLowerCase();
        const newTabRecipes = []
        recipes.forEach(element => {

            //looking for a match
            let findIt = false;
            function search () {
                const findInTitle = element.name.toLowerCase().includes(inputData);
                const findInDescription = element.description.toLowerCase().includes(inputData);
                let findInIngredients = false;

                element.ingredients.forEach(element => {
                    const see = element.ingredient.toLowerCase().includes(inputData);
                    if (see == true) {
                        findInIngredients = true
                    }
                });

                if (findInTitle || findInDescription || findInIngredients == true) {
                    findIt = true;
                }
                else {
                    findIt = false;
                }
            }
            search();

            if (findIt == true) {
                newTabRecipes.push(element);
            }
        });
        new Recipes (newTabRecipes);
    }
    else {
        new Recipes (recipes);
    }
}