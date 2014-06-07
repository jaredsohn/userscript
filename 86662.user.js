// ==UserScript==
// @name           Gmail - Slim Multiple Inboxes
// @namespace      http://userscripts.org/users/10897
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = "div.nK > div.A1 { padding: 0; margin: 0; } div.nK > div.A1 > div > div { display: none; } div.nK > div.A1 > div > div.Cr { display: inline !important; position: relative; top: -22px; right: 46px; } div.nK > div.A1 > div > div.Cr span.e { display: none; }";
document.getElementsByTagName('head')[0].appendChild(style);