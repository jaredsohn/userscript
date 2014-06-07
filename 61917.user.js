// ==UserScript==
// @name           SIO2ads
// @namespace      http://userscripts.org/users/zzzjim
// @description    Remove SIO2 ads
// @include        http://forum.sio2interactive.com/
// ==/UserScript==

var removeme = document.getElementById('page-header');
if ( removeme ) {
	var child = removeme.children[1];
	child.parentNode.removeChild(child);
}