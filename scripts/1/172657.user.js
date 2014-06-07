// ==UserScript==
// @name           Convert Case
// @author         Devether <devether@gmail.com>
// @namespace      devether
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @require        http://buzzy.260mb.com/AutoUpdater.js
// @match          http*://*
// @description    Convert case of selected text
// @version        0.0.1
// ==/UserScript==

var version = "0.0.1";
var usCode = 88886;

( function() {

	// access to window object cross-browser
	var uW;
	if (typeof unsafeWindow === 'object') {
		uW = unsafeWindow;
	} else {
		uW = window;
	}

	// get jQuery
	//var $ = uW.jQuery;

	// add a console function
	var l;
	if (typeof uW.console === 'object' && typeof uW.console.log === 'function') {
		l = uW.console.log;
	} else {
		l = function() {
			return false;
		};
	}
	
	// Object.create() by Douglas Crockford
	if (typeof Object.create !== 'function') {
		Object.create = function(o) {
			var F = function() {
			};
			F.prototype = o;
			return new F();
		};
	}
	
	// The script
	var ConvertCase = ( function() {
		
	}());
	
	
	
	ConvertCase();
	autoUpdate(usCode, version);

}());