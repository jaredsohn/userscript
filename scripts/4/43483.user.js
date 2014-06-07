// ==UserScript==
// @name        SA Forums: One Sig Per Person
// @namespace   meta.ironi.st
// @description Limits the display of signatures to one sig per person per page
// @include     http://forums.somethingawful.com/showthread.php*
// @author      Nigglypuff
// ==/UserScript==

(function () {
	var sigs = document.querySelectorAll('p.signature, p.signature~*'),
		seen = {}, html;
	
	for (var sig, i = 0; sig = sigs[i++];) {
		if (seen[sig.innerHTML]) sig.style.display = 'none';
		else seen[sig.innerHTML] = true;
	}
	
	if (location.hash) location = location.hash;
})();