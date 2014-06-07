// ==UserScript==
// @name           EB ekstra fix
// @namespace      ekstrabladet.dk
// @include 	   *ekstrabladet.dk*
// @description    EB ekstra fix
// @version        1.0
// ==/UserScript==

if(window.location.protocol != "https:") {
	if(document.querySelectorAll(".extragfx").length > 0) {
		window.location.replace("https:" + window.location.href.substring(window.location.protocol.length));
	}
}