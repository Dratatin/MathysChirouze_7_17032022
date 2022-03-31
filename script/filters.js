import { CreateTag } from "./templates/tag.js";

export class Filter {
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
            // Open sort list
            if (open == false) {
                const placeholderMin = placeholder.toLowerCase();
                filter.querySelector("ul").classList.remove("filters__element__list--hide");
                input.classList.add("filters__element__button__input--after");
                input.placeholder = `Rechercher un ${placeholderMin}`;
                input.style.cursor = "text";
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
            // Close sort list
            else if (open == true && dropDownIcon.contains(e.target)) {
                remove();
            }
        });
        function remove () {
            filter.querySelector("ul").classList.add("filters__element__list--hide");
            input.classList.remove("filters__element__button__input--after");
            input.placeholder = placeholder;
            input.style.cursor = "pointer";
            dropDownIcon.classList.remove("dropdownIcon--after");
            othersFilters.forEach(element => {
                element.style.pointerEvents = "unset";
            });
            open = false;
        }
    }
}


export class Tag {
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