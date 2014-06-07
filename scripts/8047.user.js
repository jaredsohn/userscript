// ==UserScript==
// @name          Geody goes black
// @namespace     http://labs.geody.com/greasemonkey/
// @description	  Geody nights
// @author	      GeodyWorks (from a script by farkob)
// @include       http://www.geody.*
// ==/UserScript==

function addGlobalStyle(css) {
var head,style;
head = document.getElementsByTagName('head')[0];
if (head) {
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}
}

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
ts[c].style.color = "#fff";
}

var emenub = '.edgemenuborder { border:1px solid black; padding: 3px; background:#3a3a3a; text-decoration:none; font-size:11px; font-weight:bold; font-family:arial,helvetica; }';
addGlobalStyle(emenub);
