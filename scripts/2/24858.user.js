// ==UserScript==
// @name           nopaste.voric.com - JavaScript Code Beautifier
// @namespace      http://userscripts.org/users/33073/scripts
// @description    This script adds a little 'Beautify' link to pretty-print and nicely indent your code.
// @include        http://nopaste.voric.com/*
// ==/UserScript==

if (window.location.href.match(/paste\.php\?f=([^&#=]+)/i)) {
	var id = RegExp.$1;
	var link = document.createElement("span");
		link.innerHTML = "<img src=\"images/spinner.gif\" style=\"display: none; margin-bottom: -3px;\" id=\"beautify-loader\"\/>[ <a href= \"#\" id=\"beautify\">Beautify<\/a> ]";
		link.childNodes[2].addEventListener("click", function() {
			document.getElementById("beautify-loader").style.display = "";
			GM_xmlhttpRequest({
				method: "get",
				url: "http://o0t.de/javascript/?id="+id,
				onload: function(e) {
					document.getElementById("beautify-loader").style.display = "none";
					document.getElementById("beautify").innerHTML = "Beautified";
					document.getElementById("code").innerHTML = e.responseText;
				}
			});
			this.blur();
		}, false);
	document.getElementById("infoLinks").insertBefore(link, document.getElementById("infoLinks").firstChild);
}