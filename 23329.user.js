// ==UserScript==
// @name           KoL Bounty Status
// @namespace      http://freecog.net/2008/
// @description    Displays the current status of your Bounty Hunter Hunter bounty.
// @include        http://*kingdomofloathing.com/*
// @exclude        http://forums.kingdomofloathing.com/*
// ==/UserScript==

if (/^http:\/\/(www\d*\.)?kingdomofloathing\.com\/topmenu\.php/.test(document.location)) {
	var container = document.createElement("span");
	with (container.style) {
		background = "white";
		position = "fixed";
		top = "3px";
		right = "5px";
		padding = "3px 5px 3px 5px";
		MozUserSelect = "none";
	}
	container.addEventListener("dblclick", function() {
		GM_setValue("status", "");
	}, false);
	document.body.appendChild(container);
	window.setTimeout(function(){
		var status = GM_getValue("status", "");
		container.style.display = status ? "inline" : "none";
		container.style.backgroundColor = /^(\d+) of \1 /.test(status) ? "lightgreen" : "white";
		container.textContent = status;
		window.setTimeout(arguments.callee, 300);
	}, 100);
} else if (/^http:\/\/(www\d*\.)?kingdomofloathing\.com\/fight\.php/.test(document.location)) {
	var status = document.body.textContent.match(/\((\d+ of \d+ found)\.\)/);
	if (status) GM_setValue("status", status[1]);
} else if (/^http:\/\/(www\d*\.)?kingdomofloathing\.com\/bhh\.php/.test(document.location)) {
	if (document.body.textContent.match(/Get some rest -- you've earned it!/)) {
		window.addEventListener("unload", function() {
			GM_setValue("status", "");
		}, false);
	}
}