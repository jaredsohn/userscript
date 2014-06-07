// ==UserScript==
// @name         Grooveshark Remove Broadcast Share
// @namespace    http://dvbris.com/
// @version      1.0
// @description  Removes the share dialog in the Grooveshark broadcast chat area
// @match        http://grooveshark.com/*
// @copyright    2014, Geraint White
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).bind('DOMNodeInserted', function(e) {
    if ($(e.target).is('#page-content')) $('#bc-share').remove();
});