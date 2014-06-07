// ==UserScript==
// @name           Vertalen.nu: Adremover
// @description    Verwijdert alle advertenties op vertalen.nu
// @include        http://www.vertalen.nu/*
// @version        1.1
// ==/UserScript==

try {
		var Ad = document.getElementById("div-gpt-ad-1331740151227-0").parentNode;
 		Ad.parentNode.removeChild(Ad);
} catch(err) {}

try {
		var Ad = document.getElementById("sponsordiv");
		Ad.parentNode.removeChild(Ad);
} catch(err) {}

try {
		var Ad = document.getElementById("aswift_0_anchor").parentNode.parentNode;
 		Ad.parentNode.removeChild(Ad);
} catch(err) {}

try {
		var Ad = document.getElementById("aswift_1_anchor").parentNode.parentNode;
 		Ad.parentNode.removeChild(Ad);
		var Expand = document.getElementsByClassName("roundedborder");
		Expand[0].style.width = "100%";
} catch(err) {}