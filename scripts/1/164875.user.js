// ==UserScript==
// @name           OK Cupid Radius Shrinker
// @namespace      http://www.outshine.com/
// @description    Need to search for people closer than 25 miles?  This allows you to shrink your search area down to 10, 5, or 1 mile.
// @include        *okcupid.com/match*
// @version        1.0.0
// @grant          none
// ==/UserScript==

/*
Script by Tony Boyd.
Authored on 2013-04-13.
Updated on 2013-04-13.
*/

var radiusSelectMenu = document.getElementById('radius');

if (radiusSelectMenu) {
	selectOption1 = document.createElement('option');
	selectOption1.value = '1';
	selectOption1.textContent = '1 mile';

	selectOption5 = document.createElement('option');
	selectOption5.value = '5';
	selectOption5.textContent = '5 miles';

	selectOption10 = document.createElement('option');
	selectOption10.value = '10';
	selectOption10.textContent = '10 miles';

	radiusSelectMenu.insertBefore(selectOption10, radiusSelectMenu.childNodes[0]);
	radiusSelectMenu.insertBefore(selectOption5, radiusSelectMenu.childNodes[0]);
	radiusSelectMenu.insertBefore(selectOption1, radiusSelectMenu.childNodes[0]);

	var result = {};
	var keyValuePairs = location.search.slice(1).split('&');
    keyValuePairs.forEach(function(keyValuePair) {
        keyValuePair = keyValuePair.split('=');
        result[keyValuePair[0]] = keyValuePair[1] || '';
    });
	if (result['filter3']) {
		radiusSelected = result['filter3'].split(',');
		radiusSelectMenu.value = radiusSelected[1];
		Mc.location_text();
	}
}
