// ==UserScript==
// @name           Remove Videos From Lockerz
// @namespace      Yash
// @include        http://www.lockerz.com/myLockerz
// ==/UserScript==

for (i = 0; i < (a = document.getElementsByTagName("embed")).length; i++) {
    with($ = a[i].style) width = "0px", height = "0px";
}