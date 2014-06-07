// ==UserScript==
// @name        GameFAQs Improved <code> tags
// @namespace   Kraust
// @include     *gamefaqs.com/*
// @version     1.0.0
// @grant       none
// @require		http://yandex.st/highlightjs/8.0/highlight.min.js
// ==/UserScript==

// You use the <code> tags like normal. Nothing has changed except there's actual syntax highlighting now. This is seriously only 3 lines.

$("code").wrap("<pre></pre>");

$("head").append("<link rel='stylesheet' type='text/css' href='http://yandex.st/highlightjs/8.0/styles/default.min.css' >");
hljs.initHighlightingOnLoad();

