// ==UserScript==
// @name       EraseNow
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @domain          youtube.com
// @domain          www.youtube.com
// @domain          gdata.youtube.com
// @match           http://*.youtube.com/*
// @match           https://*.youtube.com/*
// @match           http://userscripts.org/scripts/source/114002.meta.js
// @match           http://s.ytimg.com/yts/jsbin/*
// @match           https://s.ytimg.com/yts/jsbin/*
// @include         http://*.youtube.com/*
// @include         https://*.youtube.com/*
// @exclude         http://apiblog.youtube.com/*
// @exclude         https://apiblog.youtube.com/*
// ==/UserScript==

var links = document.getElementsByTagName('a');
var i;
for (i = 0; i < links.length; ++i) {
    links[i].href = links[i].href + "&feature=youtu.be&t=15s";
}