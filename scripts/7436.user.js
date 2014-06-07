// ==UserScript==
// @name          Google goes black
// @namespace     google.com
// @description	  Google goes black to save world (if google was black we would save 30,000 megawatts a year)
// @author	  farkob
// @include       http://*google.com*
// ==/UserScript==

document.getElementsByTagName("body")[0].style.background = "#000";
document.getElementsByTagName("body")[0].style.color = "#fff";
var ps = document.getElementsByTagName("p");
var fonts = document.getElementsByTagName("font");
var links = document.getElementsByTagName("a");
var ts = document.getElementsByTagName("td");

  for (var e = 0; e < ps.length; e++) {
ps[e].style.color = "#fff";
}

  for (var c = 0; c < fonts.length; c++) {
fonts[c].style.color = "#fff";
}

  for (var c = 0; c < links.length; c++) {
links[c].style.color = "#fff";
}

  for (var c = 0; c < ts.length; c++) {
ts[c].style.background = "#000";
}