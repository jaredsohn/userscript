// ==UserScript==
// @name       Fixed top bar Google
// @author MagnusVisel
// @version    1.0
// @include       http://*.google.*
// @include       https://*.google.*
// @exclude	  https://mail.google.*
// @exclude	  http://mail.google.*
// @exclude       http://maps.google.*
// ==/UserScript==

var mngb = document.getElementById("mngb");
var main = document.getElementById("main");
mngb.style.position = "fixed";
mngb.style.zIndex = 99999;
mngb.style.width = "100%";
main.style.paddingTop = "102px";