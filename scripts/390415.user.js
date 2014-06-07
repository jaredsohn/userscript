// ==UserScript==
// @name          fbn Custom
// @namespace  
// @version       1.0
// @description   Dark theme for HackForums
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @copyright     2013-2014 fbn
// @author        Sasori
// @updateURL     http://userscripts.org/scripts/source/390415.meta.js
// @downloadURL   http://userscripts.org/scripts/source/390415.user.js
// @run-at        document-start
// ==/UserScript==

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://fbn.ssdclient.com/scripts/style.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);
