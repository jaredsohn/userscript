// ==UserScript==
// @name          TLBW - Featured Streams
// @description   Changes stream sidebar to only feature BW streams on teamliquid.net
// @version       2.5
// @include       http://teamliquid.net/*
// @include       http://www.teamliquid.net/*
// @exclude       http://teamliquid.net/sc2/*
// @exclude       http://teamliquid.net/store/*
// @exclude       http://teamliquid.net/tlfe/*
// @exclude       http://teamliquid.net/tournaments/*
// @exclude       http://teamliquid.net/vods/*
// @exclude       http://www.teamliquid.net/sc2/*
// @exclude       http://www.teamliquid.net/store/*
// @exclude       http://www.teamliquid.net/tlfe/*
// @exclude       http://www.teamliquid.net/tournaments/*
// @exclude       http://www.teamliquid.net/vods/*
// @exclude       http://www.teamliquid.net/mirror/ad*
// @run-at        document-end
// ==/UserScript==

(function(){

function main() {
	/* Feature only BW streams
	   Thanks to WhuazGoodJaggah */
	var featureStream = function (node) {
		var featured = ["[BW]"];
		for (var i = 0; i < featured.length; i++) {
			var s = featured[i];
			if (node.innerHTML.indexOf(s) != -1) {
				return true;
			}
		}
		return false;
	}
	
	var featuredNodes = new Array();
	var otherNodes = new Array();
	var moreStreams = document.getElementById("more_streams");
	var expandLink = document.getElementById("link_more_streams");
	var featuredStreams = expandLink.parentNode;

	var nodes = featuredStreams.getElementsByTagName("a");
	for (var i=0; i < nodes.length; i++) {
		var node = nodes[i];
		if (node == expandLink) {
			continue;
		}
		if (featureStream(node)) {
			featuredNodes.push(node);
		}
		else {
			otherNodes.push(node);
		}
	}
	
	while (featuredStreams.hasChildNodes()) {
		featuredStreams.removeChild(featuredStreams.firstChild);
	}
	
	while (moreStreams.hasChildNodes()) {
		moreStreams.removeChild(moreStreams.firstChild);
	}
	
	for (var i=0; i < featuredNodes.length; i++) {
		featuredStreams.innerHTML += "• ";
		featuredStreams.appendChild(featuredNodes[i]);
		featuredStreams.appendChild(document.createElement("br"));
	}
	
	for (var i=0; i < otherNodes.length; i++) {
		moreStreams.innerHTML += "• ";
		moreStreams.appendChild(otherNodes[i]);
		moreStreams.appendChild(document.createElement("br"));
	}
	
	var spacer = document.createElement("div");
	spacer.setAttribute("style", "height:5px");
	featuredStreams.appendChild(spacer);
	featuredStreams.innerHTML += "[ ";
	featuredStreams.appendChild(expandLink);
	featuredStreams.innerHTML += " ]";
	featuredStreams.appendChild(moreStreams);
}


var nextObject = function(el) {
	var n = el;
	do n = n.nextSibling;
	while (n && n.nodeType != 1);
	return n;
}

if (window.opera) {
	if (document.readyState==="loading")  {
		if (window.addEventListener)
			window.addEventListener("DOMContentLoaded", main, false);
		else if (window.attachEvent)
			window.attachEvent("onload", main);
	}
	else if (document.readyState==="complete") {
		main();
	}
	else {
		if (window.addEventListener)
			window.addEventListener("load", main, false);
		else if (window.attachEvent)
			window.attachEvent("onload", main);
	}
}
else {
	main();
}
})();
