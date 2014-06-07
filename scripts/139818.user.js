// ==UserScript==
// @name		Clean YouTube watch URLs
// @namespace		cleanytwatchurl
// @version		1.0.3
// @run-at		document-start
// @description		Cleans YouTube watch URLs.
// @match		*://www.youtube.com/watch*
// ==/UserScript==
var s = window.location.search;
function getV(k) {
	return new RegExp(k + '=([^&]*)', 'i').exec(s)[0];
}
var get = getV('v')
if (s.indexOf('list') + 1) get += '&' + getV('list');
if (s.indexOf('playnext') + 1) get += '&' + getV('playnext');
if (s != '?' + get) location.replace(location.protocol + '//www.youtube.com/watch?' + get);