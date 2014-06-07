// ==UserScript==
// @name           Hide "Clone in Windows" and "Zip" buttons
// @namespace      http://userscripts.org/users/408873
// @include        /^https?://github\.com\/.*\/.*$/
// ==/UserScript==
(function () {
	function hide() {
		var clones = document.getElementsByClassName("native-clones")[0];
		if (clones) clones.style.display="none";
		else setTimeout(hide, 500);
	}
	setTimeout(hide, 500);
})();