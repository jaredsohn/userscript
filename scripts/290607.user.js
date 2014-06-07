// ==UserScript==
// @name        Mr Skin Auto Download
// @namespace   MrSkin
// @description Auto download when open player page
// @include     http://www.mrskin.com/clipplayer/*
// @version     1
// @grant       none
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
    self.location = $(".btn-group:nth-of-type(2) .btn:first-child").attr("href");
}

addJQuery(main);