// ==UserScript==
// @name           New Facebook relationship status options for the WHOLE DAMN WORLD.
// @author         Candice Payne
// @namespace      http://www.negativesmart.com/
// @description    Adds civil union and domestic partnership relationship status options to Facebook.
// @include        *facebook.com/*sk=relationships*
// ==/UserScript==

function xyzzy () {
	document.getElementById("editProfileForm").removeEventListener('DOMNodeInserted', xyzzy, false);
	var fnord = document.getElementsByName('status')[0];
	if (fnord.options.length != 12) {
		fnord.options[fnord.options.length] = new Option('In a civil union', '10');
		fnord.options[fnord.options.length] = new Option('In a domestic partnership', '11');
	}
}
document.getElementById("editProfileForm").addEventListener('DOMNodeInserted', xyzzy, false); // Is this right? I don't know what I'm doing, really.