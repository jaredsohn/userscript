// ==UserScript==
// @name        arachnophobia
// @namespace   arachnophobia
// @description hides spiders
// @include     https://*
// @include     http://*
// @version     1
// ==/UserScript==

var images = document.getElementsByTagName("img"); 
for (var i = 0; i < images.length; i++) { 
    var alt = images[i].alt.toLowerCase(); 
    var src = images[i].src.toLowerCase();
    if ( alt.indexOf("spider")>-1 || alt.indexOf("araña")>-1 ||
         src.indexOf("spider")>-1 || src.indexOf("araña")>-1) {
         if (alt.indexOf("spiderman") > -1 || src.indexOf("spiderman") >-1)
            break;
        console.log("Hiding: " + alt);
        images[i].parentNode.parentNode.removeChild(images[i].parentNode);
    }
}
