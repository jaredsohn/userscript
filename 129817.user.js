// ==UserScript==
// @name           REMOVETHECAT
// @namespace      Jeremy Geels
// @include        *tf2r.com*
// ==/UserScript==

var body = document.getElementsByTagName("body")[0]
body.removeChild(body.getElementsByTagName("span")[0]);
var header = document.getElementById("header");
header.removeChild(document.getElementsByTagName("iframe")[0]);