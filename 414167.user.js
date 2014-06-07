// ==UserScript==
// @name Hacker News Links and Comments in New Tab
// @version 0.1.1
// @description Changes links on HN to open in new Tab
// @match *://news.ycombinator.com/*
// @match *://hackerne.ws/*
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

//  Inspired from Jeremy Cartrell's HN Script
$(document).ready(function() {
    $('td.title a').attr('target', '_blank');  // Links on mainpage 
    $('td.subtext a').attr('target', '_blank'); // Comments on mainpage
});