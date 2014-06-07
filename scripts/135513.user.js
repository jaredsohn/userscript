// ==UserScript==
// @name        hide banner tlr
// @namespace   thenoob
// @description hiddes the banner for tlr
// @include     http://www.thelostrunes.com/game.php
// ==/UserScript==

var divpage = document.getElementById("page");
var divheader = document.getElementById("header_banner");
divpage.removeChild(divheader);
