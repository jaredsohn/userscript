// ==UserScript==
// @name SiG Monospace
// @author Michael Gosling
// @version 0.1
// @description Changes font to Monospace in description/summary sections
// @include https://soitgo.es/?i=SIG*
// @include https://soitgo.es/?i=add
// @include https://soitgo.es/?i=edit*
// ==/UserScript==

if (document.URL.match(/.+?i=SIG.+/))
{
var desc = document.getElementById("info");
desc.style.fontFamily="monospace";
} else {
var summary = document.getElementById("summary");
var editDesc = summary.getElementsByTagName("textarea");
editDesc[0].style.fontFamily="monospace";
}