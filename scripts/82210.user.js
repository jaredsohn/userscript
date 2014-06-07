// ==UserScript==
// @name           Audio Mod Display
// @namespace      EJR.newgrounds.com
// @include        http://*newgrounds.com/bbs/*

// @include        http://*.newgrounds.com/bbs/forum/*
// ==/UserScript==


var modArray = new Array("AllReligiousDrunk", "B0UNC3", "Bad-Man-Incorporated", "Bjra", "cast", "DarKsidE555", "EchozAurora", "Envy", "jarrydn",
 "Joe", "Jonas", "Khuskan", "LJCoffee", "Mrmilkcarton", "Mich", "spikrodd", "supersteph54", "sequenced", "Nav", "quarl", "RageVI", "Rig", "Rucklo", "SineRider", 

"SymbolCymbal", "TMM43",
 "xKore", "Zendra"); 



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
		if(isAudioMod(thelink) && thelinks[i].className != "moderator") thelinks[i].style.color = "#fffc00";
	}
}


function isAudioMod(n) {
	for(h=0; h<modArray.length; h++){
		if(n == modArray[h].toLowerCase()) return true;
	}
	return false;
}

function addLabel(labelDiv) {
	var old = labelDiv.getElementsByTagName('ul')[0].getElementsByTagName('li')[2];
	var e = document.createElement('li');
	e.innerHTML = "<img src='http://i.imgur.com/h9s5a.gif' alt='Audio Mod Pill' /> Audio Mod";
	labelDiv.getElementsByTagName('ul')[0].insertBefore(e, old);;
}

dotest();