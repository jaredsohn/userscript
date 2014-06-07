// ==UserScript==
// @name           Genre Mod Display
// @namespace      k-guare.com/
// @description    Makes genre Mod names light blue!
// @include        http://*newgrounds.com/bbs/*
// @include        http://*newgrounds.com/bbs/forum/*
// ==/UserScript==


var modArray = new Array("14hourlunchbreak", "Archawn", "Auz", "Bahamut", "Kool-Aid", "CommanderWalrus", "EJR", "el-presidente", "FatKidWitAJetPak", "Fro", "Jolly", "k-guare", "LegolaSS", "perry", "Rabid-Animals", "reverend", "RohanTheBarbarian", "shunshuu", "thenewbies", "ThePigeonMaster", "Zachary", "zrb",
"zuggz");



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
		if(isIconMod(thelink) && thelinks[i].className != "moderator") thelinks[i].style.color = "#0099FF";
	}
}


function isIconMod(n) {
	for(h=0; h<modArray.length; h++){
		if(n == modArray[h].toLowerCase()) return true;
	}
	return false;
}

function addLabel(labelDiv) {
	var old = labelDiv.getElementsByTagName('ul')[0].getElementsByTagName('li')[2];
	var e = document.createElement('li');
	e.innerHTML = "<img src='http://i.imgur.com/kfRUq.png' alt='genre Mod Pill' /> Genre";
	labelDiv.getElementsByTagName('ul')[0].insertBefore(e, old);;
}

dotest();