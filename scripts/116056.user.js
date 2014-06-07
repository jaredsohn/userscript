// ==UserScript==
// @name           Narrow Amazon
// @description  Gives Amazon a more modern look.
// @include        http*://www.amazon.com/*
// @version        1.0
// @copyright     Peter Zhang
// ==/UserScript== 

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
	script.addEventListener('load', function () {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

addJQuery(main);

function main() {
		$("body").children().wrapAll('<div id="ptz_amazon_wrapper" />');
}