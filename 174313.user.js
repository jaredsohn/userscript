// ==UserScript==
// @name       Google HIDE ANNOYING COOKIE WARNING AFTER PAGE LOADED
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include      https://*google.de/*
// @include      http://*google.de/*
// @include      https://*google.com/*
// @include      http://*google.com/*
// @copyright  2012+, You
// ==/UserScript==

var style = "#epbar{display: none!important}";
var styleTag = document.createElement("STYLE");
styleTag.setAttribute("type", "text/css");
styleTag.innerHTML=style;
document.head.appendChild(styleTag);
console.log(style);