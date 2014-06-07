// ==UserScript==
// @name            Allow autocomplete in login forms
// @namespace       http://userscripts.org/
// @description     Removes autocomplete="off" attributes
// @include         *
// ==/UserScript==




var form_elements = document.getElementsByTagName('form');
for (var i = 0; i < form_elements.length; i++) { 
	form_elements[i].setAttribute('autocomplete', 'on');
}