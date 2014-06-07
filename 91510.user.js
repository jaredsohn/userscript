// ==UserScript==
// @name           Camen Design - Main Site Favicon on Forums
// @namespace      http://ptmblogger.co.cc/projects/camen#favicon
// @include        http://forum.camendesign.com/*
// ==/UserScript==

var favicon = document.createElement("link");
favicon.setAttribute("rel", "icon");
favicon.setAttribute("href", "http://camendesign.com/favicon.ico");
document.getElementsByTagName("head")[0].appendChild(favicon);