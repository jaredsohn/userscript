// ==UserScript==
// @id             Old Google Layout (Now Patched)@tariqm
// @name           Old Google Layout (Now Patched)
// @namespace      tariqm
// @author         tariqm
// @description    Switches to the old Google layout. 
UPDATE: The old layout has been patched. :(
// @include        http://www.google.com*
// @include        https://www.google.com*
// @include        http://www.google.com/search?*
// @include        https://www.google.com/search?*
// @run-at         document-end
// ==/UserScript==

(function() {
	if(/google.com/i.test(location.host)) {
		var cookie = "PREF=";
		if(document.cookie.search(cookie) == -1) {
			cookie += "; expires=" + (new Date(2020, 1, 1)).toGMTString();
			cookie += "; domain=.google.com";
			document.cookie = cookie;
			location.reload();
		}
	}
})()