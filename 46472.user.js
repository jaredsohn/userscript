// ==UserScript==
// @name		MusicBrainz: Stop approve page redirecting to edit search page
// @description	Normally the approve page redirects to the page you were on when approving. If you approve things by opening them in a new tab, it's annoying to have it go back to the edit search page, so this script makes them go to the edit's page.
// @version		2009-04-11
// @author		-
// @namespace	df069240-fe79-11dc-95ff-0800200c9a66
//
// @include		http://musicbrainz.org/mod/search/results.html*
// ==/UserScript==
//**************************************************************************//

var nodes = document.getElementsByTagName("a");
for (var i = 0; i < nodes.length; i++) {
	if (nodes[i].innerHTML == "Approve") {
		var url = nodes[i].href;
		url = url.replace(/&url=.*/, "");
		nodes[i].href = url;
	}
}

