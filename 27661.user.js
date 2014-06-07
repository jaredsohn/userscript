// ==UserScript==
// @name        Chegg-It Auto-Straight
// @namespace   http://www.userscripts.org
// @description	Automatically filter results for the Straight category only.
// @include    http://*.cheggit.net/browsetorrents.php*
// ==/UserScript==

var place1 = window.content.location.href.toString();
if (place1.search(/browsetorrents\.php/i) != -1) {
if ((place1.indexOf("\?") != -1) && (place1.search("cat=") == -1) && (!place1.match(/\/$/i)) && (place1.search("filter=") == -1)) {
		window.content.location.replace(place1 + "&cat=1");
	}
	else if ((place1.search("cat=") != -1) && (place1.search("cat=1") == -1) && (place1.search("cat=3") == -1)) {
		var isolurl = place1.split("cat=")[1].split("&")[0];
		window.content.location.replace(place1.replace("cat=" + isolurl, "cat=1"));
	}
	else if ((place1.indexOf("\?") == -1) && (place1.search("cat=") == -1)) {
		window.content.location.replace(place1 + "?cat=1");
	}
}