// ==UserScript==
// @name           Rediff Image Search Remover
// @namespace      rediff_image_search_remover
// @description    Removes the Image Search link in Rediff articles
// @include        http://*.rediff.com/*
// ==/UserScript==

(function () {
    var eles = document.getElementsByTagName("font");
    var num = eles.length;
    var toremove = new Array(30); //Assume not more than 10 links.
                                  //Each link has 3 elements.
    var j = 0;
    for (var i = 0; i < num && j < 30; i++) {
        if (eles[i].innerHTML == "[" ||
            eles[i].innerHTML == "]" ||
            eles[i].innerHTML == "Images" ||
            eles[i].innerHTML == "Get Quote") {
            toremove[j++] = eles[i];
        }
    }
    for (i = 0; i < j; i++) {
        toremove[i].parentNode.removeChild(toremove[i]);
    }
})()
