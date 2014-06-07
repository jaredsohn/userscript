// ==UserScript==
// @name       HN inline poll graph
// @namespace  http://filippo.io/
// @version    0.4
// @description  Quick and dirty conversion of this bookmarklet https://news.ycombinator.com/item?id=700669
// @include      https://news.ycombinator.com/item?id=*
// ==/UserScript==

(function (cells) {
    var totalPoints = 0;
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].className == "default") {
            totalPoints += parseInt(cells[i].textContent.match(/^[0-9]+/), 10);
        }
    }
    for (i = 0; i < cells.length; i++) {
        if (cells[i].className == "default") {
            var optionPoints = parseInt(cells[i].textContent.match(/^[0-9]+/), 10);
            cells[i].setAttribute("style", "padding-left:.25em;border-left:" + (optionPoints / totalPoints) * 500 + "px solid #dcb;");
        }
    }
})(document.getElementsByTagName("table")[3].getElementsByTagName("td"));