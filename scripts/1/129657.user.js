// ==UserScript==
// @name          	Superbetter Mobile View
// @namespace		http://www.superbetter.com
// @description    	Mobile view for superbetter
// @include       	http://www.superbetter.com/*  
// @include       	https://www.superbetter.com/*  
// ==/UserScript==

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}
var r = document.getElementsByClassName("art-board")[0]
GM_log(r);
GM_log(r.parentNode);
r.parentNode.removeChild(r);
r = document.getElementsByClassName("header")[0]
r.parentNode.removeChild(r);
r = document.getElementsByClassName("right-nav")[0]
r.parentNode.removeChild(r);
r = document.getElementsByClassName("sidebar")[0]
r.parentNode.removeChild(r);
r = document.getElementById("uvTab")
r.parentNode.removeChild(r);