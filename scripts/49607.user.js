// ==UserScript==
// @name           Secure Rapidshare and Megaupload download using https
// @namespace      none
// @description    Transforms all Rapidshare & Megaupload link from http to https
// @include        *
// ==/UserScript==
for (var i = 0; i < document.links.length; i++) {
	
	var tmp_link = String(document.links[i]);

	if (tmp_link.match("rapidshare\.com")) {
		if (document.links[i].protocol == 'http:')
			document.links[i].protocol = 'https:';
	}

	/*
	if (tmp_link.match("megaupload\.com")) {
		if (document.links[i].protocol == 'http:')
			document.links[i].protocol = 'https:';
	}
	*/
}