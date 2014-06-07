// ==UserScript==
// @name          WAYF auto click
// @namespace     Zentriple
// @description	  None yet
// @include       https://wayf.wayf.dk/module.php/wayfdiscopower/disco.php*
// @grant         none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @downloadURL   https://userscripts.org/scripts/source/176330.user.js
// @updateURL     https://userscripts.org/scripts/source/176330.meta.js
// @version       2013.8.23
// ==/UserScript==

(function() {
	
	window.addEventListener('load', function() {
		setTimeout("$('#defaultidp').click();", 100);
	}, false);

})();

