// ==UserScript==
// @name           HuluIntervention
// @namespace      http://userscripts.org/users/124486
// @description    Remove unwanted shows from appearing on your home screen.  Edit the script to edit the shows.
// @include        http://www.hulu.com/
// ==/UserScript==

var shows = ["intervention", "some-lame-show"];

var links = document.getElementsByTagName("a");
for (var i = links.length - 1; i != -1 ; i--){
	for each (var show in shows) {
		if (links[i].href == 'http://www.hulu.com/' + show) {
			if (links[i].parentNode.className == "video-info") {
				GM_log("removed " + links[i].href);
				links[i].parentNode.parentNode.parentNode.removeChild(links[i].parentNode.parentNode);
			}
			else { links[i].parentNode.removeChild(links[i]) }
		}
	}
}
