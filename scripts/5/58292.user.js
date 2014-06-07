// ==UserScript==
// @name           Tidy UDTool
// @namespace      http://userscripts.org/users/72447
// @description    Hides the options output for UDTool on the UD map screen
// @include        http://www.urbandead.com/map.cgi*
// ==/UserScript==

setTimeout(function() {
	document.body.innerHTML = document.body.innerHTML.replace(/<p><font[^<]+>Enabled:.*?etc.<\/p>/i, '');
	}, 0);