// ==UserScript==
// @name           NewGrounds Ex-Mod Display
// @namespace      Jolly.newgrounds.com
// @description    Shows who is an ex-mod in "Users Online"
// @include        http://*newgrounds.com/bbs/*
// @include        http://*newgrounds.com/bbs/forum/*
// ==/UserScript==



var modArray = new Array("Alastor", "AntiTanner", "bigbadron", "BobbyJenkins", "BRS", "Canas", "CaptainBob", "Captain-Jack", "DanMalo", "DanPaladin", "DarkArchon", "Denvish", "Dobio", "DrLavaGoddess", "Dry-Ice", "Enoll", "EveningShift", "FDA", "FIGMENTUM", "Freakapotimus", "FUNKbrs", "gfoxcook", "Gooch", "gumOnShoe", "HAQnSPITT", "HuIk", "JadeTheAssassin", "Jamoke", "Jercurpac", "jmtb02", "jonthomson", "KaynSlamdyke", "Maus", "mightypotato", "NEVR", "Newgrundling", "olskoo", "Ozcar", "Proteas", "Rabid-Echidna", "Ramagi", "RedCircle", "Revenant", "Sanjay", "Sarai", "Saturday", "SBB", "ShitonaStick", "Shrapnel", "Slightly-Crazy-Dude", "Snayk", "StarCleaver", "SteveGuzzi", "Stormwarden", "TedEaston", "Terminator", "Jamoke", "TheShrike", "The-Swain", "Tremour", "Tri-Nitro-Toluene", "Uberbarista", "VeryProudOfYa");


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
		if(isIconMod(thelink) && thelinks[i].className != "moderator") thelinks[i].style.color = "#C0C0C0";
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
	e.innerHTML = "<img src='http://bbsimg.ngfiles.com/1/22174000/ngbbs4d053197d4805.gif' alt='Ex Mod Pill' /> Ex-Mod ";
	labelDiv.getElementsByTagName('ul')[0].insertBefore(e, old);;
}

dotest();