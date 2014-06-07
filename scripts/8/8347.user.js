// ==UserScript==
// @name           Facebook Gift Nuker
// @namespace      http://ww.facebook.com
// @description	   Removes gifts from the Facebook news feed and from profiles.
// @author	   Wes Barnett
// @include        http://*.facebook.com/*
// ==/UserScript==

//Removes gifts from news feed (credit to Matt Crawford for his Basketball Pooler Nuker Script, from which this is modified)
(function() {
	var disp = true;
	for (var j = 0; j < 2; j++) {
		var links = document.links;
		for (var i = 0; i < links.length; i++) {
			if (links[i].href.indexOf("stories.php?filter=19") > -1) {
				var outer = links[i].parentNode.parentNode;
				outer.parentNode.removeChild(outer);
			}
		}
	}
})();

//Removes gifts from profiles
var giftbox = document.getElementById("giftbox");
giftbox.parentNode.removeChild(giftbox);

//Removes "Give a gift to ____" on wall post section of profile
(function() {
	var disp = true;
	for (var j = 0; j < 2; j++) {
		var links = document.links;
		for (var i = 0; i < links.length; i++) {
			if (links[i].href.indexOf("giftshop.php") > -1) {
				var outer = links[i].parentNode.parentNode;
				outer.parentNode.removeChild(outer);
			}
		}
	}
})();