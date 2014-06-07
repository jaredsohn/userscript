// ==UserScript==
// @name           EggoBleeder Display
// @namespace      
// @description    Makes my name green.
// @include        http://*newgrounds.com/bbs/*
// @include        http://*newgrounds.com/bbs/forum/*
// ==/UserScript==

var EggoBleederArray = new Array("EggoBleeder");

function dotest() {
	var allElements = document.getElementsByTagName("*");
	var thediv;
	var headingCount = 0;
	var inForum = false;
	if(window.location.toString().length > 30) inForum = true;
	var dottedCount = 0;

	for(i=0; i<allElements.length; i++) {
		if(allElements[i].className == "heading") {
			headingCount++;
		}
		
		if(inForum) {
		
			if(allElements[i].className == "dotted") {
				dottedCount++;
				if(dottedCount == 4) thediv = allElements[i];
			}
		} else {
			if(allElements[i].className == "dottedtall") thediv = allElements[i];
		}
	}
	var thelinks = thediv.getElementsByTagName("a");
	for(i=0; i<thelinks.length; i++) {
		var thelink = thelinks[i].href;
		var endPos;
		thelink = thelink.slice(7);
		for(j=0; j<thelink.length; j++) {
			if(thelink.charAt(j) == ".") {
				endPos = j;
				break;
			}
		}
		thelink = thelink.substring(0,endPos);
		if(isIconMod(thelink) && thelinks[i].className != "moderator") thelinks[i].style.color = "#007700";
	}
}


function isIconMod(n) {
	for(h=0; h<EggoBleeder.length; h++){
		if(n == EggoBleeder[h].toLowerCase()) return true;
	}
	return false;
}

dotest();