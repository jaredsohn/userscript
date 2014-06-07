// ==UserScript==
// @name       Adiversions: On Hover Spoiler
// @namespace  http://www.somethingafal.com/
// @version    0.1
// @description  Hilights a spoiler on hover
// @match      http://adiversions.stalo.com/*
// @copyright  2012+, Dafydd "Afal" Francis
// ==/UserScript==

var post_spans = document.getElementById("bodyarea").getElementsByTagName("span");

for (var i = 0; i < post_spans.length; i++) {
    var span = post_spans[i];
    if(span.style.background === "black") {
        span.onmouseover = function () {
            this.style.color = "white";
        };
        span.onmouseout = function () {
            this.style.color = "black";
        };
    }
}