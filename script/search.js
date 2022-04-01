import { algo } from "./algo.js";

export class Searchbar {
    constructor () {
        this.input = document.querySelector("#search");
        this.listenInput()
    }
    listenInput () {
        this.input.addEventListener("input", algo);
    }
}