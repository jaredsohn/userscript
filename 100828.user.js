// ==UserScript==
// @name        Console alert
// @namespace   http://userscripts.org/scripts/show/100828
// @include     http://*.local/*
// @include     https://*.local/*
// @description Redirects alert box text to console
// @copyright   2011, Dmitriy Geels (http://userscripts.org/users/68556)
// @version     1.0
// @licence     LGPL 3
// ==/UserScript==


(function(){

var w = window.wrappedJSObject || window;

if (!w.alert.is_redirected) {
	w.alert = function alert(msg) {
		if (typeof w.console != 'undefined') {
			w.console.warn('Alert:' + msg);
		}
	}
	w.alert.is_redirected = true;
}

})();