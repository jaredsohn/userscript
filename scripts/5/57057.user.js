// ==UserScript==
// @name           New Facebook Simple Uploads
// @namespace      tag:hydroxy@rogers.com,2009-09-04:FSU
// @description    Always use simple upload page for adding Facebook Photos. Works with new Facebook!
// @include        http://*.facebook.com/editalbum.php*
// ==/UserScript==

(function() {
	var url = window.location.href;
	if (url.match('editalbum.php') && url.match('&add=1') && !url.match('&htmlup=1')) {
		url = url + '&htmlup=1';
		window.location.href = url;
	}
})();