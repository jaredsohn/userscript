// ==UserScript==
// @name					BioBlur
// @namespace			http://www.outshine.com/
// @description		On BioWare forums, removes the focus on the login field, allowing page down key to scroll the page.
// @include				*bioware.com/forums/viewtopic.html*
// ==/UserScript==

/*
Script by Tony Boyd, with help from RodMcguire.
Authored on 2007-05-15.
Updated on 2007-05-15.
Version: 1.0.0
*/

window.addEventListener(
	'load',
	function() {
		setTimeout(
			function () {
				document.getElementById('username').blur();
			},
		10);
	},
	false
);
