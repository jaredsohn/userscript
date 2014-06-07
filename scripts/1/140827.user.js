// ==UserScript==
// @name          supertopic (mittig)
// @author	      Stefan Kunze
// @description   supertopic mittig ausgerichtet
// @version       0.3
// @include       http://www.supertopic.de/*
// @include       http://supertopic.de/*
// ==/UserScript==

var ele_content = document.getElementById("content");
var ele_mainnavi = document.getElementById("mainnavi");

ele_content.style.margin = "0 auto";
ele_mainnavi.style.position = "relative";
ele_mainnavi.style.marginLeft = "-30px";