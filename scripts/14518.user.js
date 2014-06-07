// ==UserScript==
// @name           LipoDocs: Lipoaspiration in Google Documents
// @author         Otavio Cordeiro
// @namespace      http://userscripts.org
// @description    Google Docs with better width
// @homepage       http://userscripts.org
// @include        http://www.google.com/calendar/*
// @include        https://www.google.com/calendar/*
// @include        https://www.google.com/reader/*
// @include        http://www.google.com/reader/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/mail/*
// @include        http*://*.google.*/*
// @include        http*://groups.google.*/*
// @include        http*://spreadsheets.google.com/*
// @include        http*://docs.google.com/*
// @exclude        http*://docs.google.com/View?*
// @exclude        http*://spreadsheets.google.com/ar*
// @exclude        http*://spreadsheets.google.com/fm*
// @exclude        http*://docs.google.com/Misc*
// @exclude        http*://spreadsheets.google.com/pub*

// ==/UserScript==

var algumaCoisa = parent.document.getElementById('wys_frame_parent');
algumaCoisa.style.height = "100%";
algumaCoisa.style.width = "680px";
algumaCoisa.style.textAlign = "center";

var iframeElement = parent.document.getElementById('wys_frame');
iframeElement.style.height = "100%";
iframeElement.style.width = "680px";
iframeElement.style.paddingLeft = "10px";
iframeElement.style.marginLeft = "auto";
iframeElement.style.marginRight = "auto";

