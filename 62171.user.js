// ==UserScript==
// @name           iGoogle Sidebar Removal
// @namespace      http://www.google.com/ig*
// @include        http://www.google.com/ig*
// @description    Removes the sidebar now hl=all doesn't work
// ==/UserScript==

// igoogle currently uses a <table> with id #doc3 and two columns to position the sidebar
// this simply hides the column the sidebar is in
var doc3 = document.getElementById('col1');
if (doc3) {
	doc3.style.display = 'none';
}