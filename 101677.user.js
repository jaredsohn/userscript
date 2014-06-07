// ==UserScript==
// @name           L4DMaps.com Download Wait Bypass
// @namespace      http://userscripts.org/users/324755
// @description    Skips wait time on L4DMaps downloads.
// @include        http://www.l4dmaps.com/file-download.php*
// ==/UserScript==

var meta = document.getElementsByTagName('meta');

for (var i=0; i < meta.length; i++) {
	if (meta.item(i).httpEquiv == "refresh") {
		var regexp = new RegExp('^[0-9]{2};url=');
		var newLocation = meta.item(i).content.replace(regexp,'');
		document.location = 'http://www.l4dmaps.com/' + newLocation;
	}
}
