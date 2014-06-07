// ==UserScript==
// @name           Seznam iFrame
// @description    Nahradi poznamky na Seznamu iframem s odkazem na vlastni html
// @namespace      http://userscripts.org/users/424650
// @author         JonnyRobbie
// @include        http*://www.seznam.cz/
// @updateURL      https://userscripts.org/scripts/source/179598.meta.js
// @downloadURL    https://userscripts.org/scripts/source/179598.user.js
// @version        1.0
// ==/UserScript==

var url = ["", "", "", "about:blank"];
var size = [0, 0, 0, 313];
window.scrIframes = {};
function main() {
	for (i=0;i<url.length;i++) {
		if (url[i] != "") {
			var note = document.getElementById("notes").childNodes[i].childNodes[2].childNodes[1].childNodes[0];
			scrIframes[i] = new Object
			scrIframes[i] = document.createElement("iframe");
			scrIframes[i].src = url[i];
			scrIframes[i].style.border = "none";
			scrIframes[i].style.height = size[i] + "px";
			scrIframes[i].style.width = "100%";
			note.innerHTML = "";
			note.appendChild(scrIframes[i]);
		}
	}
}

main();