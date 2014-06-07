// ==UserScript==
// @name        Enable spell checking on OrionHub
// @namespace   https://userscripts.org/users/599176
// @description This script enables spell checking in the editor on OrionHub.
// @include     https://orionhub.org/edit/edit.html*
// @grant       none
// @version     2
// ==/UserScript==

window.addEventListener('load', function() {
	'use strict';
	setTimeout(function() {
		var items = document.querySelectorAll('[spellcheck=false]');
		for (var item = 0; item < items.length; ++item) {
			items[item].spellcheck = true;
		}
	}, 2000);
});