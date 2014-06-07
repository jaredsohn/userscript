// ==UserScript==
// @name           NewGrounds Cool Users
// @namespace      Jolly.newgrounds.com
// @description    Gives selected users a red username on the "Who's Online?" section. Excluding Most mods.
// @include        http://*newgrounds.com/bbs/*
// @include        http://*newgrounds.com/bbs/forum/*
// ==/UserScript==



var modArray = new Array("Jolly", "Shikamarana", "Twilight", "Domo",
 "14hourlunchbreak", "Danavers", "WeHaveFreshCookies", "Lady-Stardust", "Piss", "physicsman09", "Alaska", "Minion777", "DumbassDude", "Ptero", "Grub-Xer0", "SteelChair", "MakeShift", "Ronald-McDonald-LoL", "GiantDouche", "Highway", "Captain-Ben", "Rabid-Animals", "Letiger", "Xenonmonkey", "GoryBlizzard", "Cootie", "Gagsy", "Sensationalism", "HecticCircleCrap",  "HeavyMetalGuy",  "TehSlapHappy", "Zack", "DrForeMan", "Sirtom93",  "EpicFail", "BrokenPaw", "reverend", "Ashman", "Ultor", "Fro", "Klik-Sucks", "Donut", "FatJoe214", "Irrelephant", "FBIpolux", "TheSouthernTower", "ColecoVision", "Skwurll", "Esshole", "wreckages", "speeling", "Pimp", "Zachary", "MuyBurrito", "Xarnor", "14hourlunchbreak", "Afro-Ninja", "Alaska", "altr", "Archawn", "citricsquid", "EJR", 
 "Ashman", "Auz", "Bahamut", "Blounty", "Boss", "Captain-Ben", "Carmilla", "cast", "Donut",
 "DumbassDude", "dx5231", "Egoraptor", "EJR", "ForNoReason", "Fro", "Goonie", "Ismael92",
 "Joe", "K-Guare", "Keith", "Kevin", "Krinkels", "life", "Lizzardis"," Mollywop",
 "NegativeONE", "psychicpebble", "Rabid-Animals", "RageVI", "Sectus", "Saint-Jesus", "reverend", "ReNaeNae", "Sh0T-D0wN", "Aprime", "ColecoVision", "Zachary", "Tateos", "CommanderWalrus", 
 "simon", "Sir-Nuts", "speeling", "Techno", "TehSlapHappy", "Jolly", "Domo", "thenewbies", "ThePigeonMaster", "TrevorW", 
 "WeirdAlthe3rd");


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
		if(isIconMod(thelink) && thelinks[i].className != "moderator") thelinks[i].style.color = "#FF3333";
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
	e.innerHTML = "<img src='http://img.ngfiles.com/ficons/bull-adm.gif' alt='Cool User Pill' /> Cool Users";
	labelDiv.getElementsByTagName('ul')[0].insertBefore(e, old);;
}

dotest();