// ==UserScript==
// @name           remove_sides
// @namespace      techdirt
// @include        http://techdirt.com/articles/20091028/0348476705.shtml
// ==/UserScript==

var div = document.getElementById("rightcolumn");

div.style.display = "none";

div = document.getElementById("maincolumn");
div.style.width = "100%";

div = document.getElementById("blog");
div.style.width = "100%";

div = document.getElementById("navigation");
div.style.width = "100%";

div = document.getElementById("subnav");
div.style.width = "100%";
