// ==UserScript==
// @name        SPL link to Rotten Tomatos
// @namespace   http://userscripts.org/users/rockmaster
// @description links title of movie on SPL Bibliocommons site to Rotten Tomatoes
// @include     http://*.bibliocommons.com/item/show/*
// @version     1
// ==/UserScript==

var headers = document.getElementsByTagName("h1");
var header = headers[1];
var title = header.innerHTML;
var searchhref = 'http://www.rottentomatoes.com/search/?search=' + title;
var link = document.createElement('a'); // create the link
link.setAttribute('href', searchhref); // set link path
link.style.fontSize = "11px";
link.style.color = "red";

if (title.length < 39) {
  var ls = "";
  } else {
  var ls = "letter-spacing: -1px; ";
}

console.warn(title.length);
console.warn(ls);

link.innerHTML = '<div style="' + ls + 'font-family: times">search for "' + title + '" on Rotten Tomatoes</div>';
header.appendChild(link);