// ==UserScript==
// @name           Maptst
// @namespace      Me
// @description    None
// @include        http://www.delugerpg.com/map*
// ==/UserScript==
var interval = setInterval(function() {

    var theImages = document.getElementsByTagName('img');
    var theList = ['http://s1.dstatic.com/images/pokemon/front/shiny/*', '*kyogre.png'];
    for (i = 0; i < theImages.length; i++) {
        for (j = 0; j < theList.length; j++) {
            if (theImages[i].src = theList[j]) alert(theList[j] + ' found on this page');
        }
    }
}, 500);