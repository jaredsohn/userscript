// ==UserScript==
// @name           Diggit
// @namespace      www3.telus.net/sb/
// @description    Reddit, with a digg style.
// @include        htt*://*.reddit.*
// @exclude        htt*://*.reddit.com/r/newdigg/*
// ==/UserScript==

var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://www.reddit.com/r/newdigg/stylesheet.css?v=4d73161fbe7958e4f976f36a8eb3d2b0';
document.getElementsByTagName('head')[0].appendChild(link);