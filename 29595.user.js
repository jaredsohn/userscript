// ==UserScript==
// @name           PMOG User Urchin
// @namespace      http://userscripts.org/scripts/show/29595
// @include        http://pmog.com/users/*
// ==/UserScript==

// get the browse users paragraph
var pmog_uu_images = document.getElementsByTagName('img');
var pmog_uu_browse;
for (var pmog_uu_i in pmog_uu_images) {
	if (/browse_users/.test(pmog_uu_images[pmog_uu_i].src)) {
		pmog_uu_browse = pmog_uu_images[pmog_uu_i].parentNode;
	}
}
// we couldn't find it, no need to keep going
if (pmog_uu_browse) {
	var pmog_uu_clone = pmog_uu_browse.cloneNode(true); // clone time!
	// get the table we want the copy to be above
	var pmog_uu_table = document.getElementsByTagName('table')[0];
	pmog_uu_table.parentNode.insertBefore(pmog_uu_clone, pmog_uu_table);
}