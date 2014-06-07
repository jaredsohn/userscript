// ==UserScript==
// @name           handwritten font in input fields
// @namespace      http://userscripts.org/
// @description    Sets all input fields on a page to use a handwritten (cursive) font.
// @include        *
// ==/UserScript==

// excellent font list at http://www.codestyle.org/css/font-family/sampler-Cursive.shtml

(function () {

    inputs=document.getElementsByTagName("input");

    for(i in inputs){
        if(inputs[i].type == "text"){
            inputs[i].style.fontFamily = "Purisa, Bradley Hand ITC, Kristen ITC, Lucida Handwriting , Comic Sans MS, cursive";
        }
    }
})();