// ==UserScript==
// @name Protect-url show link
// @namespace Laymain
// @description Bypass Protect-url.com wait
// @include http://*.protect-url.com/go.php*
// @include http://protect-url.com/go.php*
// ==/UserScript==

(function() {
	var link = document.getElementById('lien');
	var wait = document.getElementById('wait');
	if (wait) wait.style.display = 'none';
	if (link) link.style.display = 'block';
})();