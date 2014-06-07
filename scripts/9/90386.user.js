// ==UserScript==
// @name           Official Team Fortress Wiki - Hide Languages
// @namespace      http://userscripts.org/users/Alex2539
// @description    Hides other langauges in the official Team Fortress Wiki's recent changes log.
// @include        http://wiki.teamfortress.com/w/index.php?title=Special:RecentChanges
// @include        http://wiki.teamfortress.com/w/index.php?title=Special:RecentChanges&*
// @include        http://wiki.teamfortress.com/wiki/Special:RecentChanges
// @include        http://wiki.teamfortress.com/wiki/Special:RecentChanges&*
// ==/UserScript==

var allItems = document.getElementsByTagName('table');
var pattern = /\/(..|..\-.{2,4})$/

// Add the codes of the languages you want to allow here.
// Example: To allow French and Spanish, the line would look like this:
// var allowedLangs = new Array("fr", "es");
var allowedLangs = new Array();

// Change this to true to only fade the titles of the pages
// instead of hiding them completely.
var fade = false;

for (var i = 0; i < allItems.length; i++) {
	var allLinks = allItems[i].getElementsByTagName('a');
	for (var j = 0; j < allLinks.length; j++) {
		var link = allLinks[j].href;
		if (link.match(pattern)) {
			var hide = true;
			for (var k = 0; k < allowedLangs.length; k++) {
				if (link.substr(link.indexOf("\/", link.length-9)+1, link.length-1) == allowedLangs[k])
					hide = false;
			}
			if (hide) {
				if (fade) {
					allLinks[j].innerHTML = '<span style="color:#C0C0C0">' + allLinks[j].innerHTML + '</span>';
				}
				else {
					allItems[i].style.visibility = "hidden";
					allItems[i].innerHTML = "";
				}
			}
		}
	}
}