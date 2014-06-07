// ==UserScript==
// @name       Open Hacker News Links in New Tab/Window
// @namespace  https://github.com/jmcantrell
// @version    0.1
// @description  Modifies links on Hacker News to open in a new tab/window.
// @match      https://news.ycombinator.com/*
// @copyright  2012+, Jeremy Cantrell
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
$(document).ready(function() {
    $('td.title a').attr('target', '_blank');
});