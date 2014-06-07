// ==UserScript==
// @name           Hide "Density Control"
// @namespace      http://userscripts.org/users/408873
// @include        https://www.google.com/reader/view/?tab=my#overview-page
// ==/UserScript==
(function () {
	function hide() {
		var messages = document.getElementById("team-messages");
		if (messages) messages.parentNode.style.display="none";
		else setTimeout(hide, 500);
	}
	setTimeout(hide, 500);
})();
