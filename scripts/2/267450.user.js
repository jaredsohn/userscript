// ==UserScript==
// @name       remove announs
// @namespace  dgz345
// @version    1
// @description  dgz345
// @include    *://www.conquerclub.com/*
// @copyright  dgz345
// ==/UserScript==

var nav = document.getElementsByClassName("vnav")[0];
var oppai = nav.getElementsByTagName("h3");
var x = oppai[1];
if (x.innerText="Announcements") {
    x.remove();
    oppai = nav.getElementsByTagName("ul");
    oppai[1].remove();
}