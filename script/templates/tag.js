export class CreateTag {
    constructor(filter, elemColor, filterType) {
        this.filter = filter;
        this.elemColor = elemColor;
        this.filterType = filterType;
    }
    createTag () {
        const button = document.createElement("button");
        button.setAttribute("data-filtertype", `${this.filterType}`)
        button.innerHTML = `
            ${this.filter}
            <img src="img/close.svg" alt="icon fermer">
        `
        button.classList.add("tag__button", `tag__button--${this.elemColor}`);
        return button
    }
}