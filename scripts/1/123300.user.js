// ==UserScript==
// @name           Remove "No new mail" Google Plus notice from Gmail
// @description    Removes this text from your empty Gmail inbox: "No new mail! See what people are talking about on Google+"
// @version        1.0
// @namespace      oyvey
// @include        http*://mail.google.com/*
// @match          http://mail.google.com/*
// @match          https://mail.google.com/* 
// ==/UserScript==

GM_addStyle("td.TC { display: none;}");