// ==UserScript==
// @name          TLBW - BW Liquipedia
// @description   Changes the liquipedia search bar to search the Brood War liquipedia
// @version       2.6
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
	document.getElementById("wikiselect").children[1].selected = true;
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
