// ==UserScript==
// @name           google books justext
// @description    remove boilerplate from google books
// @include       http://books.google.com/*
// @include       https://books.google.com/*
// @grant         none
// ==/UserScript==


var button = document.createElement("DIV");
var link = document.createElement("A");
link.appendChild(document.createTextNode("justext"));

// I get 'justext is not defined' when I use this:
// function justext () {
//     document.getElementById("gb").setAttribute("style", "display:none");
//     document.getElementById("gb-top-search-box").setAttribute("style", "display:none");
//     document.getElementById("menu_td").setAttribute("style", "display:none");
//     document.getElementById("titlebar").setAttribute("style", "display:none");
// }
//link.setAttribute("href", "javascript:justext();");

link.setAttribute("href", "javascript: document.getElementById(\"gb\").setAttribute(\"style\", \"display:none\"); document.getElementById(\"gb-top-search-box\").setAttribute(\"style\", \"display:none\"); document.getElementById(\"menu_td\").setAttribute(\"style\", \"display:none\"); document.getElementById(\"titlebar\").setAttribute(\"style\", \"display:none\");");

button.appendChild(link);
document.getElementById("gb-top-search-box").appendChild(button);
