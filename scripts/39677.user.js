// ==UserScript==
// @name           Cinema Paradiso: show all
// @namespace      http://raines.me.uk/
// @description    By default on cinemaparadiso.co.uk "My Rental List" is paginated at 20 rows, making it hard to sort the list. This script automatically clicks "Show All".
// @include        http://www.cinemaparadiso.co.uk/*
// ==/UserScript==

if (/\/MySelection\/MySelection.aspx$/.test(location.href)) {
	if (!/[?&]ShowAll=True/.test(location.search)) {
	    location.replace(location.href + '?&ShowAll=True');
	}
} else {
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; ++i) {
        var link = links.item(i);
        var href = link.getAttribute('href');
        if (/\/MySelection\/MySelection\.aspx$/.test(href)) {
            link.setAttribute('href', href + '?&ShowAll=True');
        }
    }
}
