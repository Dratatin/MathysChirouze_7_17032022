import { recipes } from "../data/recipes.js";
import { Recipes } from "./recipes.js";

export function algo (e) {
    if (e.target.value.length > 2 ) {
        const inputData = e.target.value;
        const newTab = []
        recipes.forEach(element => {
            const contains = element.name.includes(inputData);
            if (contains == true) {
                newTab.push(element);
            }
        });
        new Recipes (newTab);
    }
    else {
        new Recipes (recipes);
    }
}