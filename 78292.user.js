// ==UserScript==
// @name           vg.no Fjern VGTV
// @namespace      http://code.kjonigsen.net
// @description    Removes (annoying) VGTV-content from the vg.no frontpage
// @include        http://www.vg.no/
// ==/UserScript==

function removeVGTV(element) {
    if (element == null || element == undefined) {
        return;
    }
    else if (element.className == "article-content") {
        element.parentNode.style.display = "none";
        return;
    }
    else
    {
        removeVGTV(element.parentNode)
    }
}

var offenders = document.querySelectorAll("a[href^='http://www.vgtv.no']");
Array.prototype.forEach.call(offenders, removeVGTV);
