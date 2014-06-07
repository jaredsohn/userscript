// ==UserScript==
// @name           Pardus Off Topic Forum Remover
// @version        1.0
// @namespace      johnwu@radio.blmurphy.net
// @description    hides the off-topic forum
// @include        http://forum.pardus.at*
// @grant       none
// ==/UserScript==

try {
var tableborder = document.getElementsByClassName("tableborder");
var forums = tableborder[2].getElementsByTagName("tr");
forums[3].style.display = 'none';
var a = tableborder[2].getElementsByTagName("a");
a[0].href="http://forum.pardus.at/index.php";
}
catch(err) {
}