// ==UserScript==
// @name            rep2ch
// @namespace       http://lowreal.net/2006/rep2ch.user.js
// @description     2ch スレへのリンクを全て rep2ch 用に
// @include         http://*.2ch.net/test/read.cgi/*
// @include         http://*.bbspink.com/test/read.cgi/*
// ==/UserScript==
//

(function () {
	// @include だと http://example.com/?http://ex.2ch.net/test/read.cgi/* にもマッチしてしまう
	var regexp = RegExp("^http://[^.]+?\.(2ch\.net|bbspink\.com)/test/read.cgi/[^/]+?/[0-9]+");
	if (!document.location.href.match(regexp)) return;

	var URL_TO = GM_getValue("url_to");
	
	var setURL = function () {
		URL_TO = prompt("Input rep2 URL.\nex. http://example.com/rep2/read.php?url=");
		GM_setValue("url_to", URL_TO);
	}
	
	if (!URL_TO || URL_TO == "") {
		setURL();
	}

	if (confirm("Open with rep2ch?")) {
		window.location = URL_TO + window.location.href;
	}


	var div = document.createElement("div");
	with (div.style) {
		border = "1px solid #000";
		margin = "0 0 0.5em 0";
		padding = "0 1em";
		background = "#fff";
	}
	
	var link = document.createElement('a');
	link.href = URL_TO + document.location.href;
	link.appendChild(document.createTextNode("Open with rep2"));
	div.appendChild(link);

	div.appendChild(document.createTextNode(" "));

	var slink = document.createElement("a");
	slink.href = "javascript:void();";
	slink.addEventListener("click", setURL, false);
	slink.addEventListener("keypress", setURL, false);
	slink.appendChild(document.createTextNode("Reset rep2 URL"));
	div.appendChild(slink);

	var refNode = document.body.firstChild;
	document.body.insertBefore(div, refNode);
})();
