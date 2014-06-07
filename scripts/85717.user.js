// ==UserScript==
// @name           Golden Aura Yourself
// @namespace      k-guare.com/
// @description    Give yourself that extra BBS confidence boost you need.
// @include        http://*.newgrounds.com/*
// @include        http://*newgrounds.com/bbs/topic/*
// ==/UserScript==

function dotest() {
	var allElements = document.getElementsByTagName("*");
	var statsArray = new Array();
	
	var spanElement = document.getElementById("loginbox_username");
	var anchorArray = spanElement.getElementsByTagName("a");
	var thename = linkToName(anchorArray[0].href);
	var onUserPage = false;
	var userlevel, ilink, dindex, postername;
	
	if(linkToName(window.location.toString()) == thename) onUserPage = true;
	
	if(!onUserPage) {
		for(i=0; i<allElements.length; i++) {
			if(allElements[i].className == "userstats") statsArray.push(allElements[i]);
		}
	}
	
	
	if(onUserPage) {
		userlevel = document.getElementById("ulevel");
		ilink = userlevel.style.backgroundImage;
		dindex = ilink.length - 7;
		if(ilink.charAt(ilink.length-2) != "'" && ilink.charAt(ilink.length-2) != '"') dindex++; // Chrome fix for not displaying quotes in url("")
		if(userlevel.style.backgroundImage.charAt(dindex) != "G") {
			// If they're not already a mod, make them one. ;)
			userlevel.style.backgroundImage = ilink.substring(0,dindex) + "F" + ilink.substring(dindex + 1);
		}
	} else {
		
		for(i=0; i<statsArray.length; i++) {
			var linkarray = statsArray[i].getElementsByTagName("a");
			postername = linkToName(linkarray[0].href);
			if(postername != thename) continue;
			
			// If we're here, then the post is confirmed to be theirs.
			
			
			var imgarray = statsArray[i].getElementsByTagName("img");
			
			ilink = imgarray[0].src; // Doesn't scroll through entire array, to not interfere with other scripts (VitaminP ;).)
			dindex = ilink.length - 5;
			imgarray[0].src = ilink.substring(0,dindex) + "F" + ilink.substring(dindex + 1);
			
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

dotest();