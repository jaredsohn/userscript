// ==UserScript==
// @name            Force Full Web Outlook
// @author          Nick Colley
// @description     Stops stupid auto 'premium browser' checking.
// @license         Creative Commons Attribution License
// @version	        0.1
// @compatible      Greasemonkey
// ==/UserScript==

(function(){
	window.onload = function(){
		var c = document.getElementById("chkBsc");
		c.checked = false;
		c.disabled = false;
	};
})();