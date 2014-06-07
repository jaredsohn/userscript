// ==UserScript==
// @name          Typography Geek
// @description	  Times New Roman and Arial suck! This replaces them by better fonts
// @namespace     http://halfaclick.blogspot.com/
// @include       *

//Developed by Mayank Singhal
// ==/UserScript==

(function() {
	function GeekIt() {
		var SansSerifFamily = "Calibri, Helvetica, Tahoma, 'Sans Serif', Arial";
		var SerifFamily = "Cambria, Georgia, Serif, Garamond, 'Times New Roman'";
		var ancs = document.childNodes;
		for (it = 0; it <ancs.length; it++) {
				ancs[it].style.fontFamily = ancs[it].style.fontFamily.replace("Arial", SansSerifFamily);
				ancs[it].style.fontFamily = ancs[it].style.fontFamily.replace("'Times New Roman'", SerifFamily);
		}
	}
	GeekIt();
})();