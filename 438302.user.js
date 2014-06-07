// ==UserScript==
// @name Travian.ws fix
// @description Fixes broken links on travian.ws, cheers ;)
// @include http://travian.ws/analyser.pl*
// ==/UserScript==

var o = document.body.innerHTML,
    r = "a2b.php?z=";
while (o.indexOf(r) != -1) {
    o = o.replace(r, "build.php?id=39&tt=2&z=");
}
document.body.innerHTML = o;