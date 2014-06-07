// ==UserScript==
// @name           Techbargains
// @namespace      DevSteve
// @description    remove ads
// @include        http://www.techbargains.com/*
// ==/UserScript==

var i
var tds = document.getElementsByTagName("td")
var td
for (i = 0; i < tds.length; i++) {
    td = tds[i]
    if (td.className == "adInner" || td.className == "RSColumn") {
        td.style.display = "none"
    }
}
