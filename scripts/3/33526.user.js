// ==UserScript==
// @name           bookmarks
// @namespace      http://userscripts.org/users/33073/scripts
// @include        http://forum.mods.de/bb/index.php
// ==/UserScript==


var list = document.getElementById("bookmarklist"),
	hr = list.getElementsByTagName("hr")[0];
list.getElementsByTagName("table")[0].style.display = "none";
var link = document.createElement("a");
	link.textContent = "Lesezeichen anzeigen";
	link.style.cssText = "cursor: pointer; text-decoration: underline;"
	link.addEventListener("click", function() {
		list.getElementsByTagName("table")[0].style.display = "block";
		this.style.display = "none";
	}, false);
list.appendChild(link);

