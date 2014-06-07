// ==UserScript==
// @name           Minifeed Photos Blocker (support Fan Check, All my Friends, Friends Character, Zodiac, Friend and friend.ly)
// @namespace      http://userscripts.org/scripts/show/57174
// @include        http://*.facebook.com/*
// @version        1.4 - 17.09.2009
// ==/UserScript==

(function () {

document.addEventListener("DOMNodeInserted", killFCP, false);

function killFCP() {
	if ( top.location.href.match('\/home\.php') ) {
		var divovi = document.getElementsByTagName("div");
		var divbr = divovi.length;
		for (i=0; i < divbr; i++) {
			var div = divovi[i];
			if ( div.className == "UIHotStory UIHotStory_Small" || div.className == "UIHotStory_First UIHotStory UIHotStory_Small" ) {

				if ( div.innerHTML.match(/(\>Fan Check Photos<\/a>|\>All my Friends\!<\/a>|\>Friends<\/a>|\>Friends Character|\>Zodiac Friend Photos<\/a>|\>friend\.ly Photos<\/a>)/g) ) {

					div.style.display = "none";
				}
			}
		}

	}
}

}) ();
