// ==UserScript==
// @name        Dropbox.com - Allow External Search Links
// @namespace   Seifer - http://userscripts.org/users/seifer
// @include     https://www.dropbox.com/home#search*
// @version     1
// ==/UserScript==

if(document.getElementById('browse-search-input')) {
	var decoded = decode(window.location.toString().split('#')[1]);
	document.getElementById('browse-search-input').setAttribute('value',getQueryVar('search',decoded));
}

function getQueryVar(variable,query)
{
	var query = query || window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return('');
}

function encode(text) {
	return (encodeURIComponent((text)));
}
function decode(text) {
	return (decodeURIComponent((text).replace(/\+/g," ")));
} 