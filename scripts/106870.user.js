// ==UserScript==
// @name        UK'IN
// @namespace    You kiddin?
// @description     Replace string "ing" with "in"
// @include    *.*
// @version    1.0
// ==/UserScript==

function alterString(str) {
    /*
    str = str.replace(/Kidding/g, "Kiddin'");
    str = str.replace(/kidding/g, "kiddin'");
    */
    str = str.replace(/ing/g, "in");
    return str;
}
document.body.innerHTML = alterString(document.body.innerHTML);