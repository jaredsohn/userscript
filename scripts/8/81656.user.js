// ==UserScript==
// @name           SideReel Auto Redirect
// @namespace      http://vaseeharan.net/
// @include        http://www.sidereel.com/*/_watchlinkviewer/*
// ==/UserScript==

function $(i) { return document.getElementById(i); }
function main() {
    var e = $('elbURL');
    if (e) { window.location = e.href; }
}

main()
