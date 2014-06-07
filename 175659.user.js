// ==UserScript==
// @name        TS Enchanter
// @namespace   http://userscripts.org/users/goodgy
// @description TS Enchanter
// @include     http://www.s3.toughsociety.com/*
// @version     1
// ==/UserScript==

// Cross-browser unsafeWindow (opera/moz/webkit)
var greaseWindow = (function(){
	var a;
	try {
		a = unsafeWindow === window ? false : unsafeWindow;
	} finally {
		return a || (function(){
			var e = document.createElement('p');
			e.setAttribute('onclick', 'return window;');
			return e.onclick();
		}());
	}
}());

// Make jQuery avaible in the script
var $ = greaseWindow.jQuery;

$("#replyto").removeAttr("disabled");
$("#replyto2").removeAttr("style");
$("#comid").removeAttr("type");
