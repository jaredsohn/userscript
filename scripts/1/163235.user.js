// ==UserScript==
// @name GMX logout unreminder
// @author Night2k5
// @namespace   https://navigator.gmx.net
// @description Skips GMX logout reminding shit
// @include     https://navigator.gmx.net/remindlogout*
// @version     1.6
// ==/UserScript==
(function() {
	var simpleString = window.location.href;
	var anotherSimpleString = 'https://navigator.gmx.net/navigator/show?sid=';
	window.location.href = anotherSimpleString.concat(simpleString.slice((simpleString.length-96), simpleString.length));
})();