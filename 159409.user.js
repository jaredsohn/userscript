// ==UserScript==
// @name        ixquick/startpage - remove ads, sponsored links
// @description Removes sponsored links from ixquick.com and startpage.com search engine results.
// @namespace   example.com
// @include     https://ixquick.com/*
// @include     https://startpage.com/*
// @include     https://www.ixquick.com/*
// @include     https://www.startpage.com/*
// @author      John Woods
// @author      FredScript
// @version     0.0.3
// ==/UserScript==

var elem = document.getElementById("sponsored");
elem.parentNode.removeChild(elem);
var elem = document.getElementById("sponsored");
elem.parentNode.removeChild(elem);
