// ==UserScript==
// @name           Facebook Test
// @namespace      http://userscripts.org/users/88394
// @description    Facebook Test
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://*.facebook.com/* 
// ==/UserScript==

function main() {
	function doIt(){
		document.documentElement.removeEventListener('DOMNodeInserted', doIt, false);
		$.each($('.messageBody'), function() {
			if (!$(this).hasClass('iamcool')) {
				$(this).html("JEG ER SKIDE SEJ!!!! "+$(this).html());
				$(this).addClass('iamcool');
			}
		});
		document.documentElement.addEventListener('DOMNodeInserted', doIt, false);
	}
	doIt();
	document.documentElement.addEventListener('DOMNodeInserted', doIt, false);
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

addJQuery(main);