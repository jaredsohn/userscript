// ==UserScript==
// @name           Disable Yahoo Mail Classic AJAX
// @namespace      http://www.badmonkeh.com
// @description    Disables the AJAX of Yahoo Mail Classic
// @include        http://*.mail.yahoo.com/mc/welcome*
// ==/UserScript==

var location = document.location.toString();

if (location.indexOf('noajax') == -1) {
	window.location = location + (location.indexOf('?') > -1 ? '&' : '?') + 'noajax';	
}