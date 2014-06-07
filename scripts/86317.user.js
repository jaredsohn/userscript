// ==UserScript==
// @name           NewGrounds Cool Users Golden Aura
// @namespace      k-guare.com/
// @description    For shits and giggles.
// @include        http://*newgrounds.com/bbs/topic/*
// @include        http://*.newgrounds.com/
// @include        http://*.newgrounds.com/news/
// @include        http://*.newgrounds.com/news/post/*
// ==/UserScript==

var modArray = new Array("Jolly", "Shikamarana", "Twilight", "Domo",
 "14hourlunchbreak", "Danavers", "WeHaveFreshCookies", "Lady-Stardust", "Piss", "physicsman09", "Alaska", "Minion777", "DumbassDude", "Ptero", "Grub-Xer0", "SteelChair", "MakeShift", "Ronald-McDonald-LoL", "GiantDouche", "Highway", "Captain-Ben", "Rabid-Animals", "Letiger", "Xenonmonkey", "GoryBlizzard", "Cootie", "Gagsy", "Sensationalism", "HecticCircleCrap",  "HeavyMetalGuy",  "TehSlapHappy", "Zack", "DrForeMan", "Sirtom93",  "EpicFail", "BrokenPaw", "reverend", "Ashman", "Ultor", "Fro", "Klik-Sucks", "Donut", "FatJoe214", "Irrelephant", "FBIpolux", "TheSouthernTower", "ColecoVision", "Skwurll", "Esshole", "wreckages", "speeling", "Pimp", "Zachary", "MuyBurrito", "Xarnor", "14hourlunchbreak", "Afro-Ninja", "Alaska", "altr", "Archawn", "citricsquid", "EJR", 
 "Ashman", "Auz", "Bahamut", "Blounty", "Boss", "Captain-Ben", "Carmilla", "cast", "Donut",
 "DumbassDude", "dx5231", "Egoraptor", "EJR", "ForNoReason", "Fro", "Goonie", "Ismael92",
 "Joe", "K-Guare", "Keith", "Kevin", "Krinkels", "life", "Lizzardis"," Mollywop",
 "NegativeONE", "psychicpebble", "Rabid-Animals", "RageVI", "Sectus", "Saint-Jesus", "reverend", "ReNaeNae", "Sh0T-D0wN", "Aprime", "ColecoVision", "Zachary", "CommanderWalrus", 
 "simon", "Sir-Nuts", "speeling", "Techno", "TehSlapHappy", "Jolly", "Domo", "thenewbies", "ThePigeonMaster", "TrevorW", 
 "WeirdAlthe3rd");

function dotest() {
	var allElements = document.getElementsByTagName("*");
	var statsArray = new Array();
	var onUserPage = false;
	var userlevel;
	
	var ilink;
	var dindex;
	
	if(isIconMod(linkToName(window.location.toString()))) onUserPage = true;
	
	for(i=0; i<allElements.length; i++) {
		if(allElements[i].className == "userstats") statsArray.push(allElements[i]);
	}
	
	
	
	if(onUserPage) {
		userlevel = document.getElementById("ulevel");
		ilink = userlevel.style.backgroundImage;
		dindex = ilink.length - 7;
		if(ilink.charAt(ilink.length-2) != "'" && ilink.charAt(ilink.length-2) != '"') dindex++; // Chrome fix for not displaying quotes in url("")
		userlevel.style.backgroundImage = ilink.substring(0,dindex) + "G" + ilink.substring(dindex + 1);
	} else {
		for(i=0; i<statsArray.length; i++) {
			var anchorarray = statsArray[i].getElementsByTagName("a");
			thename = linkToName(anchorarray[0].href);
			if(!isIconMod(thename)) continue;
			
			// If we're here, they're an approved Icon Mod.
			
			
			var imgarray = statsArray[i].getElementsByTagName("img");
			for(j=0; j<imgarray.length; j++) {
				
				ilink = imgarray[j].src;
				dindex = ilink.length - 5;
				imgarray[j].src = ilink.substring(0,dindex) + "G" + ilink.substring(dindex + 1);
			}
		}
	}
}

function linkToName(u) {
		var endPos = 0;
		name = u.slice(7);
		for(l=0; l<name.length; l++) {
			if(name.charAt(l) == ".") {
				endPos = l;
				break;
			}
		}
		name = name.substring(0, endPos);
		return name.toLowerCase();
}

function isIconMod(n) {
	for(h=0; h<modArray.length; h++){
		if(n == modArray[h].toLowerCase()) return true;
	}
	return false;
}

dotest();