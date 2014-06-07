// ==UserScript==
// @name           keygen.us instant download
// @namespace      http://userscripts.org/users/76340
// @description    Bypass Keygen.us time delay
// @include        http://keygen.us/get.shtml?*
// ==/UserScript==

function speedscript()
{
var w=1;
setInterval('PlzWait();',0);
}
window.addEventListener("load", speedscript(), false);

function PlzWait() {
document.getElementById("btn").disabled=false;
}