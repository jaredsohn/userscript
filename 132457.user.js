// ==UserScript==
// @author         raina
// @name           JSLint tab
// @version        2.0.2012-05-24
// @description    Enable the use of the tab key in the JSLint script input box
// @license        http://creativecommons.org/licenses/by-nc/3.0/
// @namespace      http://userscripts.org/users/315152
// @include        http://www.jslint.com/
// @include        http://jslint.com/
// ==/UserScript==

// ==License==
// This script is licensed under Creative Commons Attribution-NonCommercial 3.0
// Unported (CC BY-NC 3.0). See http://creativecommons.org/licenses/by-nc/3.0/
// for details. In short, you are allowed to share and adapt this work for
// noncommercial purposes, provided you credit me. Contact me for licensing to
// commercial use.
// ==/License==

var jslintInput = document.getElementById('JSLINT_SOURCE').getElementsByTagName('textarea')[0];

function tabIsIt(e) {
	"use strict";
	if (e.keyCode === 9) {
		e.preventDefault();
		var scrollPos = jslintInput.scrollTop,
			caretPos = jslintInput.selectionStart + 1;

		jslintInput.value = jslintInput.value.substr(0, jslintInput.selectionStart) + "\t" + jslintInput.value.substr(jslintInput.selectionEnd, jslintInput.value.length);
		jslintInput.scrollTop = scrollPos;
		jslintInput.setSelectionRange(caretPos, caretPos);
	}
}

if (jslintInput) {
	jslintInput.addEventListener('keydown', tabIsIt, false);
} else {
	console.log("JSLint tab script has expired. Might be time to bug the author to update it.");
}
