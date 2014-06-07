// ==UserScript==
// @name           Hide Percentile Box
// @namespace      dd
// @description    dd
// @include        *what.cd/user.php?id=*
// ==/UserScript==
var divides = document.getElementsByTagName("div");



for (var i=0; i<divides.length; i++) {

	if (divides[i].className=="box" && divides[i].innerHTML.search ("Data uploaded:")>0) {

		divides[i].style.display = "none";

	}

}