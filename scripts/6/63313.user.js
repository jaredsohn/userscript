// ==UserScript==
// @name           POST A LOLDOG QUICKLY
// @namespace      loldog@roosterteeth.com
// @description    LOL DOG
// @include        http://roosterteeth.com/comics/strip.php?id=*
// @include        http://redvsblue.com/comics/strip.php?id=*
// @include        http://*.roosterteeth.com/comics/strip.php?id=*
// @include        http://strangerhood.com/comics/strip.php?id=*
// @include        http://captaindynamic.com/comics/strip.php?id=*
// @include        http://roosterteeth.com/preview.php
// @include        http://redvsblue.com/preview.php
// @include        http://*.roosterteeth.com/preview.php
// @include        http://strangerhood.com/preview.php
// @include        http://captaindynamic.com/preview.php
// ==/UserScript==

(function() {
    try {
        var postRow = document.getElementById("Add a Comment").getElementsByTagName("tr")[1];
    } catch (e) {
        var postRow = document.getElementsByTagName("form")[0].getElementsByTagName("tr")[2];
    }

    var postBox = document.getElementsByTagName("textarea")[0];
    var buttoncell = document.createElement("td");
    buttoncell.vAlign = "bottom";
    buttoncell.appendChild(document.createTextNode(" [ "));

    var button = document.createElement("a");

        button.addEventListener("click", function () {
            postBox.value += "[img]http://becauseican.co.za/wp-content/uploads/2009/07/i_will_crush_you_loldog_elephant_ears_pajama_pals_pet_costume.jpg[/img]";
            postBox.focus();
        }, false);

        button.className = "small";
        button.innerHTML = "<b>LOLDOG</b>";
        button.title = "Click Here to Paste a LOLDOG!";

    buttoncell.appendChild(button);
    buttoncell.appendChild(document.createTextNode(" ] "));
    try {
        postRow.insertBefore(buttoncell, postRow.childNodes[2]);
    } catch(e) {
        getTitleElements(document.forms.namedItem("post").getElementsByTagName("table")[0]).appendChild(document.createTextNode(" - "));
        getTitleElements(document.forms.namedItem("post").getElementsByTagName("table")[0]).appendChild(button);
    }
})();

function getTitleElements(elem) {
    var allElems = elem.getElementsByTagName("td");
    var titleElem = [];
    for(i in allElems)
        if(allElems[i].className == "title")
            titleElem.push(allElems[i]);

    return titleElem[0];
}
