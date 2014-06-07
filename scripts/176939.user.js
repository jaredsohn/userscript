// ==UserScript==
// @name       Dalloz Bibliothèque Page Multi-Selection
// @version    0.1
// @description  Makes it easier to select multiple pages in print dialog in Dalloz Bibliothèques
// @match      http://*.dalloz-bibliotheque.fr/fr/dlz_thumbnailPrint.asp?*
// ==/UserScript==

var div = document.createElement("div");
div.style.position = "absolute";
div.style.top = "26px";
div.style.left = "600px";
div.style.width = "300px";
div.style.cursor = "pointer";
div.innerHTML = "<a>Sélectionner plusieurs pages d'un coup</a>";

document.querySelector("div#PT").appendChild(div);

div.addEventListener("click", function() {
    var answer = prompt("Quelles pages souhaitez-vous sélectionner ?", "1-100");
    if (answer.match(/\d+-\d+/)) {
        var pages = answer.split("-");
        if (pages[0] < pages[1]) {
            var toggle = document.querySelector("iframe").contentWindow.Thumbnail_togglePage;
            for (var i = pages[0]; i <= pages[1]; i++) {
                toggle(i);
            }
        }
    }
}, false);