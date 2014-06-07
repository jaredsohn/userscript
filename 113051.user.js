// ==UserScript==
// @name	Dawson Autocomplete
// @namespace	http://jerail.ca/
// @include	http://dawsoncollege.omnivox.ca/intr/Login.asp*
// ==/UserScript==

var frm = document.forms[1];
frm.elements[0].setAttribute('autocomplete', 'on');
frm.elements[1].setAttribute('autocomplete', 'on');