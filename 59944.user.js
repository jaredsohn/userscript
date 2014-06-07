
// ==UserScript==
// @name FocusTest

alert('hi');

window.onfocus = displaynot;

function displaynot() {
	alert('hi');
}
// ==/UserScript==