// ==UserScript==
// @name        lolskill replace links
// @namespace   Edu
// @include     http://www.lolskill.net/top*
// @version     1
// @grant       none
// ==/UserScript==

a = document.getElementsByTagName("a");
for (var i = 0; i < a.length; i++) {
	if (a[i].href.indexOf("summoner") == -1) {
		continue;
	} else {
		var region = a[i].href.split("-")[1];
		a[i].href = "http://lolking.net/search?name=" + a[i].innerHTML + "&region=" + region;
	}
}