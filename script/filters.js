import { CreateTag } from "./templates/tag.js";
import { filtersAlgo } from "./algo.js";

export class Filter {
    constructor (filters, DOMfilter, elemColor) {
        this.filters = filters;
        this.DOMfilter = DOMfilter;
        this.elemColor = elemColor;
        this.DOMfilter.addEventListener("input", this.manageSearchWidget.bind(this));
        this.displayFilters(this.filters);
        this.filterEvent();
    }
    manageSearchWidget(e) {
        if (e.target.value.length > 2 ) {
            const inputData = e.target.value.toLowerCase();
            const newTabFilters = []
            this.filters.forEach(element => {
                //looking for a match
                const findIt = element.toLowerCase().includes(inputData);
                if (findIt == true) {
                    newTabFilters.push(element);
                }
            });
            this.displayFilters(newTabFilters);
        }
        else {
            this.displayFilters(this.filters);
        }
    }
    displayFilters (filters) {
        const listContainer = this.DOMfilter.querySelector("ul");
        listContainer.innerHTML = "";
        filters.forEach(element => {
            const li = document.createElement("li");
            li.innerText = element;
            listContainer.appendChild(li);
            li.addEventListener("click", (e) => {
                new Tag (li.innerText, this.elemColor);
                filtersAlgo(e);
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
    constructor(filter, elemColor, filterType) {
        this.filter = filter;
        this.elemColor = elemColor;
        this.filterType = filterType;
        this.addTag();
    }
    addTag () {
        let tag = new CreateTag (this.filter, this.elemColor, this.filterType);
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