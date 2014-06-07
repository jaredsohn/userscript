// ==UserScript==
// @name		Wikipedia Donation Ad Remover
// @description		Removes the annoying contribute from the top of the page.
// @include		http://*wikipedia.org/wiki*
// @include		http://*wikipedia.org/w*
// ==/UserScript==

(function() {

	if(document.getElementById("siteNotice")) {
		document.getElementById("siteNotice").style.display="none";
	}

})();
			