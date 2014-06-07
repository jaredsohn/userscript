// ==UserScript==
// @name           Kledon_1
// @description    Kledon teszt
// @include        http://index.hu/24ora/*
// ==/UserScript==

elements = document.getElementsByClassName("ajanlo_text");
do {
kledon = Math.floor((Math.random()*elements.length)+1);
} while ( elements[kledon].innerHTML.length == 0);
var msg = elements[kledon].innerHTML;

//alert(window.parent.document.getElementById("output").innerHTML);

var oFrame=document.createElement("iframe");
oFrame.src = "http://victorlima.org/kledon/test.html?param="+msg;
document.body.appendChild(oFrame);