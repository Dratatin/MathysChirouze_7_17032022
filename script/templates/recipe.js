export class Recipe {
    constructor (recipe) {
        this.name = recipe.name;
        this.ingredients = recipe.ingredients;
        this.time = recipe.time;
        this.description = recipe.description;
        this.appliance = recipe.appliance;
        this.ustensils = recipe.ustensils;
    }
    createRecipeBox () {
        const article = document.createElement("article");
        article.classList = "recipe";

        const a = document.createElement("a");
        a.classList = "recipe__image";
        a.innerHTML = `<img src="" alt="">`

        const div = document.createElement("div");
        div.classList = "recipe__description";

        const divHeader = document.createElement("div");
        divHeader.classList ="recipe__description__header";
        divHeader.innerHTML = `
            <h2 class="recipe__description__header__title">${this.name}</h2>
            <div class="recipe__description__header__time">
                <img src="img/time.svg" alt="Icon temps de préparation de la recette">
                <span>${this.time} min</span>
            </div>`

        const divDescription = document.createElement("div");
        divDescription.classList = "recipe__description__content";
        const ul = document.createElement("ul");
        ul.classList = "recipe__description__content__liste";
        divDescription.appendChild(ul);

        this.ingredients.forEach(element => {
            const li = document.createElement("li");
            if (element.unit != undefined)  {
                li.innerHTML = `<span>${element.ingredient}:</span> ${element.quantity}${element.unit}`;
            }
            else {
                li.innerHTML = `<span>${element.ingredient}:</span> ${element.quantity}`;
            }
            ul.appendChild(li);
        });

        const p = document.createElement("p");
        p.classList = "recipe__description__content__text";
        p.innerText = this.description;
        divDescription.appendChild(p);

        
        div.appendChild(divHeader);
        div.appendChild(divDescription);
        article.appendChild(a);
        article.appendChild(div);

        return article;
    }
}