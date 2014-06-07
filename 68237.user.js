// ==UserScript==
// @name           rtl
// @namespace      rtl
// @include        http://rtl-now.rtl.de/
// ==/UserScript==

var ads = document.getelementbyid("navbar")
ads.style.position = "none";

var ads2 = document.getelementbyid("navbarshadow")
ads2.style.position = "none";