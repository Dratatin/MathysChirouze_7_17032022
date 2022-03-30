import { recipes } from "../data/recipes.js";
import { Recipe } from "./templates/recipe.js";
import { CreateTag } from "./templates/tag.js";


class App {
    static init () {
        new App (recipes);
    }
    constructor (recipes) {
        this.recipes = recipes;
        this.launchFilters();
        this.launchRecipes();
    }
    launchFilters () {
        let ingredients = [];
        let appliances = [];
        let ustensils = [];
        this.recipes.forEach(recipe => {
            recipe.ingredients.forEach(element => {
                ingredients.push(element.ingredient.charAt(0).toUpperCase() + element.ingredient.slice(1));
            });
            appliances.push(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1));
            recipe.ustensils.forEach(element => {
                ustensils.push(element.charAt(0).toUpperCase() + element.slice(1));
            });
        });

        // remove duplicates
        ingredients = ingredients.filter(function(element , position){
            return ingredients.indexOf(element) == position;
        })
        appliances = appliances.filter(function(element , position){
            return appliances.indexOf(element) == position;
        })
        ustensils = ustensils.filter(function(element , position){
            return ustensils.indexOf(element) == position;
        })

        new Filter(ingredients, document.querySelector("#ingredients"), "secondary");
        new Filter(appliances, document.querySelector("#appliances"), "tertiary");
        new Filter(ustensils, document.querySelector("#ustensils"), "quaternary");
    }
    launchRecipes () {
        new Recipes(this.recipes);
    }
}


class Filter {
    constructor (filters, DOMfilter, elemColor) {
        this.filters = filters;
        this.DOMfilter = DOMfilter;
        this.elemColor = elemColor;
        this.addFilters();
        this.filterEvent();
    }
    addFilters () {
        this.filters.forEach(element => {
            const li = document.createElement("li");
            li.innerText = element;
            this.DOMfilter.querySelector("ul").appendChild(li);
            li.addEventListener("click", () => {
                new Tag (li.innerText, this.elemColor);
            })
        });
    }
    filterEvent () {
        let open = false;
        const input = this.DOMfilter.querySelector("input");
        const placeholder = input.placeholder;
        const filter = this.DOMfilter;
        let othersFilters = Array.from(document.querySelectorAll(".filters__element"));
        othersFilters = othersFilters.filter((elem) => { return elem !== filter });
        const dropDownIcon = this.DOMfilter.querySelector("img");

        this.DOMfilter.addEventListener("click", (e) => {
            e.stopPropagation();
            othersFilters.forEach(element => {
                element.style.pointerEvents = "none";
            });
            if (open == false) {
                const placeholderMin = placeholder.toLowerCase();
                filter.querySelector("ul").classList.remove("filters__element__list--hide");
                input.classList.add("filters__element__button__input--after");
                input.placeholder = `Rechercher un ${placeholderMin}`;
                input.focus();
                dropDownIcon.classList.add("dropdownIcon--after");
                open = true;
                document.addEventListener("click", function toggle(e) {
                    if (!filter.contains(e.target)) {
                        remove();
                    } 
                    this.removeEventListener("click", toggle);
                });
            }
            else if (open == true && dropDownIcon.contains(e.target)) {
                remove();
            }
        });
        function remove () {
            filter.querySelector("ul").classList.add("filters__element__list--hide");
            input.classList.remove("filters__element__button__input--after");
            input.placeholder = placeholder;
            dropDownIcon.classList.remove("dropdownIcon--after");
            othersFilters.forEach(element => {
                element.style.pointerEvents = "unset";
            });
            open = false;
        }
    }
}

class Tag {
    constructor(filter, elemColor) {
        this.filter = filter;
        this.elemColor = elemColor;
        this.addTag();
    }
    addTag () {
        let tag = new CreateTag (this.filter, this.elemColor);
        tag = tag.createTag();
        const tagConteneur = document.querySelector(".tag");
        tagConteneur.appendChild(tag);
        tag.addEventListener("click", this.removeTag)
    }
    removeTag (e) {
        let element = e.target;
        element.parentNode.removeChild(element);
    }
}

class Recipes {
    constructor (recipes) {
        this.recipes = recipes;
        this.addRecipes();
    }
    addRecipes () {
        const resultSection = document.querySelector(".result-section");
        this.recipes.forEach(element => {
            const recipeDOM = new Recipe(element);
            resultSection.appendChild(recipeDOM.createRecipeBox());
        });
    }
}







App.init();