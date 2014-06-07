// ==UserScript==
// @name           No Google Messages in Reader
// @namespace      http://people.sigh.asia/~sulaiman
// @description    Removes a google message that appers in the home page of google reader.
// @include        https://www.google.com/reader/view/*
// @include        http://www.google.com/reader/view/*
// @match          https://www.google.com/reader/view/*
// @match          http://www.google.com/reader/view/*
// @version        1.0
// ==/UserScript==
// Copyrights: Public domain. Although I would appreceate it if you gave me credit :)


var s=document.createElement("style")
s.setAttribute("type", "text/css")
s.textContent = "#team-messages{ display:none; }\n";
document.getElementsByTagName("head")[0].appendChild(s);
