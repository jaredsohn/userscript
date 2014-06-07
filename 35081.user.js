// ==UserScript==
// @name           Freeporn.to minus ads
// @namespace      http://christopheklein.info
// @description    Removes ads from http://www.freeporn.to/
// @include        http://www.freeporn.to/
// @include        http://www.freeporn.to/*
// ==/UserScript==

var clean = function() {

	// Remove right ads
	var adcontainerRight = document.getElementById('adcontainerRight');
	if(adcontainerRight) {
		adcontainerRight.parentNode.removeChild(adcontainerRight);
	}

	// Remove footer ads
	var allDivs, thisDiv;
	allDivs = document.evaluate(
		"//div[@class='adfooter']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		thisDiv.parentNode.removeChild(thisDiv);
	}

	// Remove first visit sliding popup
	var allDivs, thisDiv;
	allDivs = document.evaluate(
		"//script[@src='http://freeporn.to/firstload-pu.js']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		thisDiv.parentNode.removeChild(thisDiv);
	}

	// Remove ad when closing first visit sliding popup
	var allDivs, thisDiv;
	allDivs = document.evaluate(
		"//script[@src='http://www.hideit.org/advert/pop/freeporn.php']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		thisDiv.parentNode.removeChild(thisDiv);
	}

	// Remove ad before the movie
	var flashMovieCode = document.getElementById('movieplayer').innerHTML.replace('&amp;adimg1=http://www.freeporn.to/images/partner/player.jpg&amp;adimg=http://www.freeporn.to/images/partner/player.jpg&amp;adlink=http://www.visit-x.net/x/177/?w=7285', '');
	var flashMovieCode = flashMovieCode.replace('flashvars="', 'flashvars="autostart=true&amp;');
	document.getElementById('movieplayer').innerHTML = flashMovieCode;

	// 
	//var player = document.getElementById('player');
//	player.sendEvent("PLAY");
var player;

function playerReady(obj) {
	var id = obj['id'];
	var version = obj['version'];
	var client = obj['client'];
	alert('the videoplayer '+id+' has been instantiated');
	player = document.getElementById(id);
};


	// Remove social bookmarking links
	var socials = document.getElementById('socials');
	if(socials) {
		socials.parentNode.removeChild(socials);
	}
}

window.addEventListener('load', clean, true);
