// ==UserScript==
// @name         TheOnion.com Gregbox Remover
// @namespace    tag176.gregremover
// @include      http://www.theonion.com/*
// @author       Jon Swift (JonS42)
// @description  Removes gregbox and other overlays from theonion.com
// @grant        none
// @version      1.0
// ==/UserScript==

var DEBUG = false;
var injected = false;

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.qq=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
	if (typeof window._gregremover === 'undefined')
		window._gregremover = 1;
}

function main() {
	qq('#gregbox-outer').css('display', 'none');
}

DEBUG && console.log('Everything seems loaded, injecting.');
addJQuery(main);