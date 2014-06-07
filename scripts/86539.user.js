// ==UserScript==
// @name           GoogleStaticTopBar
// @description    Makes the top bar in Google.. always there... no matter where you are on the page.
// @namespace	  http://googlestaticbar.lukebutler.com
// @author         Luke Butler
// @include       http://*.google.*
// @include       https://*.google.*
// @exclude	  https://mail.google.*
// @exclude	  http://mail.google.*
// @exclude       http://maps.google.*
// @version        2.20
// ==/UserScript==

var main = document.getElementById("main");
var mngb = document.getElementById("mngb");

function loadcss(){
	mngb.style.position = "fixed";
	mngb.style.width = "100%";
	mngb.style.zIndex = "9999999";
	main.style.paddingTop = "102px";	
}
main.addEventListener("DOMSubtreeModified", loadcss(), true);
loadcss();