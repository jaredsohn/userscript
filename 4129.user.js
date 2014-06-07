// Bypass the turboupload.com download time delay
// v.2

// ==UserScript==
// @name          Turboupload D/L Time Delay Bypass
// @namespace     http://www.digivill.net/~joykillr/firefox
// @description   Immediately show the turboupload.com download link without having to wait for the time delay.  Updated: Now works with or without javascript.
// @include       http://d.turboupload.com/*
// ==/UserScript==

(function() {
	if (window.content.location.href.match(/\.html$/)) {	
		GM_addStyle("#div1 {display: none !important;} #div2 {display: inline !important;}")
	}
	
	if (window.content.location.href.match(/dl\.tu$/)) {	
		if (document.body.parentNode.innerHTML.indexOf("unescape")) {
			var rew = document.body.parentNode.innerHTML.indexOf("unescape");
			rew = document.body.parentNode.innerHTML.substr(rew);
			rew = rew.split("'")[1];
			GM_addStyle("#wait {display: none !important;}");
			var turbobox = document.createElement("div");
			turbobox.setAttribute("id", "hackdiv");
			turbobox.setAttribute("style", "display: inline !important;");
			turbobox.innerHTML = '<table style="width:auto;"><tr>' +
			'<td style="text-align:left;">' +
			'<h4> D/L Link: </h4>' +
			'<a href="' + unescape(rew) + '">Click here to download file</a>' + 
			'<br /></td></tr></table>';
			document.getElementById("wait").parentNode.insertBefore(turbobox, document.getElementById("wait").parentNode.lastChild);
		}
	}
	
})();
