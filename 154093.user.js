// ==UserScript==
// @author         Yang Sheng Han <shenghan.yang@gmail.com>
// @name           Centerialized Youtube.
// @description    Centerialized Youtube interface released on Dec 10, 2012. This script is just for those who wnat a centralized interface.
// @version        1.1
// @license        GPLv3 License
// @namespace      http://yangshenghan.twbbs.org
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// ==/UserScript==

var container = document.getElementById("body-container");

container.style.margin = "0 auto";
container.style.width = "1200px";

var footer = document.getElementById("footer-hh-container");

footer.style.margin = "0 auto";
footer.style.width = "1200px";
