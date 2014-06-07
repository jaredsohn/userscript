// ==UserScript==
// @name           Cheggit Collapse Recent Searches
// @namespace      http://userscripts.org/users/4294
// @description    Collapses Recent Searches box
// @include        http://cheggit.net/browsetorrents.php
// @include        http://cheggit.net/browsetorrents.php?*
// ==/UserScript==

function collapseRecentSearches() {
	var rsb = document.getElementById('recentSearchesBox');
	if (rsb != undefined) {
		var rsbt = rsb.getElementsByTagName("p")[0];
		var rsbl = rsb.getElementsByTagName("ul")[0];
		rsbt.innerHTML += ' <span id="rsb-collapse">+</span>';
		rsbl.style.display = "none";
		rsb.getElementsByTagName("br")[0].style.display = "none";
		var rsbc = document.getElementById('rsb-collapse');
		rsbt.addEventListener("click", function() { if (rsbc.innerHTML.match('-')) { rsbl.style.display='none'; rsbc.innerHTML='+'; } else { rsbl.style.display='inline'; rsbc.innerHTML='-'; } }, false);
	}
}

collapseRecentSearches();
