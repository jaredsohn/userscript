// ==UserScript==
// @name           Status Relasi Facebook.
// @author         Udhy.net
// @namespace      http://www.udhy.net/
// @description    Tambahkan status civil union dan domestic partnership relationship di Facebook.
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
document.getElementById("editProfileForm").addEventListener('DOMNodeInserted', xyzzy, false); // nggak tau ini bener apa nggak.