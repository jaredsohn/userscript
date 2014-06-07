// ==UserScript==
// @name       SouthParkStudios Scrim Deleter
// @namespace  http://michaelhamilton.com
// @version    0.1
// @description  Deletes the scrim that pops over content on the official southpark website.  Useful with tampermonkey or greasemonkey.
// @match      http://www.southparkstudios.com/*
// @copyright  2013+, Michael Hamilton
// ==/UserScript==

var divs=document.getElementsByTagName('div') 
for (var i=0;i<divs.length;i++){
	var img = divs[i],
	style = img.currentStyle || window.getComputedStyle(img, false),
	bi = style.backgroundImage.slice(4, -1);
    if(bi == "http://www.southparkstudios.com/layout/common/img/geoblock/background.png"){
        img.parentNode.removeChild(img);
    }
}