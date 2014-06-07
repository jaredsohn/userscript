// ==UserScript==
// @name           Grepolis Tools Extern Links
// @author         Krishna
// @version        1.5
// @include        http://*.grepolis.*
// @description    Grepolis Extern Links
// ==/UserScript==



var grepolink = document.createElement("a");
var grepolinkText = document.createTextNode("Statistici Grepolis");
var a    = document.createElement('a');
grepolink.href = "http://ro.grepostats.com/";
grepolink.target = "_blank"
grepolink.appendChild(grepolinkText);
document.getElementById("http://ro.grepolismaps.org/").appendChild(grepolink);