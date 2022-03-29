export class CreateTag {
    constructor(filter, elemColor) {
        this.filter = filter;
        this.elemColor = elemColor;
    }
    createTag () {
        const button = document.createElement("button");
        button.innerHTML = `
            ${this.filter}
            <img src="img/close.svg" alt="icon fermer">
        `
        button.classList.add("tag__button", `tag__button--${this.elemColor}`);
        return button
    }
}