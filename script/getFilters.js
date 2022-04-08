export class getFilters {
    constructor(recipes) {
        this.recipes = recipes;
    }
    getIngredients () {
        let ingredients = [];
        this.recipes.forEach(recipe => {
            recipe.ingredients.forEach(element => {
                ingredients.push(element.ingredient.charAt(0).toUpperCase() + element.ingredient.slice(1));
            });
        });
        ingredients = this.removeDuplicates(ingredients);
        return ingredients
    }
    getAppliances () {
        let appliances = [];
        this.recipes.forEach(recipe => {
            appliances.push(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1));
        });
        appliances = this.removeDuplicates(appliances);
        return appliances
    }
    getUstensils () {
        let ustensils = [];
        this.recipes.forEach(recipe => {
            recipe.ustensils.forEach(element => {
                ustensils.push(element.charAt(0).toUpperCase() + element.slice(1));
            });
        });
        ustensils = this.removeDuplicates(ustensils);
        return ustensils
    }
    removeDuplicates (tags) {
        const result = tags.filter((element , position) => {
            return tags.indexOf(element) == position;
        })
        return result;
    }
}