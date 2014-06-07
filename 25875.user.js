// Links on dzone.com lead lamely to a bookmarks page (or whatever). 
// This script fixes those links to instead open a new tab with the actual
// page. This is similar to clicking the thumbnail image on the left of the
// link - but I prefer my links to take me to the right place
//
//
//
// ==UserScript==
// @name          dzone link converter
// @namespace     http://slashzero.f2o.org/adityagore
// @description   force dzone links to open in new tabs
// @include       http://www.dzone.com/* 
// ==/UserScript==
var divs = document.getElementsByTagName("div");
for (var i = 0; i < divs.length; i++) { 
    if (!divs[i]) continue;
	if (!divs[i].id) continue;	
    if (divs[i].id.indexOf("link-") != -1) { 
        var divId = divs[i].id.substring(5); 
        var d = document.getElementById("thumb_" + divId); 
		if (!d) continue;
        var d1 = document.getElementById("vwidget-" + divId); 
		if (!d1) continue;
        var h3 = d1.nextSibling.nextSibling; 
        h3.childNodes[0].href = d.childNodes[1].href; 
        h3.childNodes[0].target = "_new";
    } 
}


//Changelog
//0.1 - new script
