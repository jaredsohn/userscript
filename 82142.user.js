// ==UserScript==
// @name           Audio Mod Display
// @namespace      ThePigeonMaster
// @description    Makes Audio Mod names blue!
// @include        http://*newgrounds.com/bbs/*
// @include        http://*newgrounds.com/bbs/forum/*
// ==/UserScript==

var modArray = new Array("AllReligiousDrunk", "B0UNC3", "Bad-Man-Incorporated", 
"Bjra", "cast", "DarKsidE555", "EchozAurora", "Envy", "jarrydn", "Joe", "Jonas", "Khuskan", 
"LJCoffee", "Mrmilkcarton", "Nav", "RageVI", "Rig", "Rucklo", "SineRider", "SymbolCymbal", 
"TMM43", "xKore", and "Zendra");

function dotest() {
	var allElements = document.getElementsByTagName("*");
	var thediv;
	var headingCount = 0;
	var inForum = false;
	if(window.location.toString().length > 30) inForum = true;
	var dottedCount = 0;

	for(i=0; i<allElements.length; i++) {
		if(allElements[i].className == "heading") {
			headingCount++
			if(headingCount == 2) addLabel(allElements[i]);
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
		if(isIconMod(thelink) && thelinks[i].className != "moderator") thelinks[i].style.color = "#0000FF";
	}
}


function isAudioMod(n) {
	for(h=0; h<modArray.length; h++){
		if(n == modArray[h].toLowerCase()) return true;
	}
	return false;
}
dotest();