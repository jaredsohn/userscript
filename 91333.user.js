// ==UserScript==
// @name        Inkbunny SSL warning to redirect
// @description Converts SSL warnings on Inkbunny to automatic redirects to the encrypted version of the site.
// @author      MiffTheFox
// @include     http://inkbunny.net/sslwholesite_warning.php?*
// @namespace   http://miff.furopolis.org/
// ==/UserScript==

(function(){
	var links = document.getElementsByTagName("a");
	for (var i in links){
		var u = links[i].href;
		if (/^https/.test(u)){
			window.location = u;
			break;
		}
	}
})();
