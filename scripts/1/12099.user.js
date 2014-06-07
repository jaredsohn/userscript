// ==UserScript==
// @name           Google Notebook A-Z
// @namespace      Dav
// @description    Sorts notebooks A-Z by default instead of by date
// @include        http://www.google.com/notebook/
// ==/UserScript==

window.addEventListener(
	'load', 
	function() { 
		var azButton = document.getElementById("gn1_3");
		var click = document.createEvent("MouseEvents");
		click.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		azButton.dispatchEvent(click);    
	},
	true);
