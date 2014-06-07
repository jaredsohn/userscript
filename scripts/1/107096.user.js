// ==UserScript==
// @name		MusicBrainz: Redirect on only one match
// @description		Since someone really liked it...
// @version		2011-06-30
// @author		-
// @namespace	df069240-fe79-11dc-95ff-0800200c9a66
//
// @include		http://*musicbrainz.org/search*
// ==/UserScript==
//**************************************************************************//

if (!document.getElementsByClassName("pageselector").length) {
	var rows = document.getElementById("content").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	if (rows.length == 1)
		document.location = rows[0].getElementsByTagName("a")[0].href;
}

