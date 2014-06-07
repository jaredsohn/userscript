// ==UserScript==
// @name           tipidSale ad remover
// @version	   0.2
// @namespace      http://www.tipidsale.com
// @description    loads reaaaaallllyy slow in my machine
// @include			http://www.tipidsale.com*
// ==/UserScript==

document.getElementById("aswift_0_anchor").innerHTML = ""
x = document.getElementsByTagName("object")

for (i=0;i<x.length;i++){
document.getElementsByTagName("object")[i].innerHTML = ""
}