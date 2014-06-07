// ==UserScript==
// @name           YouTube Layout Center Fix
// @description    Centers new default left-aligned YouTube layout
// @author         mpk
// @homepage       http://userscripts.org/scripts/show/153018
// @version        2012.12.09
// @icon           http://s.ytimg.com/yts/img/favicon_32-vflWoMFGx.png
// @updateURL      https://userscripts.org/scripts/source/153018.meta.js
// @include        http*//*.youtube.com/*
// @noframes
// @grant          none
// @run-at         document-end
// ==/UserScript==

function StyleById(b,a){document.getElementById(b) && document.getElementById(b).setAttribute("style",a)}

StyleById("yt-masthead-container","width: 100% !important; margin: auto !important;");
StyleById("yt-masthead","width: 1048px !important; margin: auto !important;");
StyleById("masthead-subnav","width: 1048px !important; margin: auto !important;");
StyleById("page-container","width: 1048px !important; margin: auto !important;");
StyleById("footer-hh","width: 1048px !important; margin: auto !important;");