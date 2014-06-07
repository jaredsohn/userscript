// ==UserScript==
// @name           Manager Font Size
// @namespace      Raktai C
// @description    Hide error 
// @include        http://*manager.co.th/*
// @include        https://*manager.co.th/*
// ==/UserScript==
window.addEventListener ("load", Greasemonkey_main, false);

function Greasemonkey_main () {
    //***** PUT YOUR GREASEMONKEY CODE HERE.
	var s = document.createElement("script");
	s.innerHTML = "SetStyle('ExtraLarge')";
	document.body.appendChild(s);
}
