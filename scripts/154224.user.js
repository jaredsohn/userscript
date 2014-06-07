// ==UserScript==
// @name        Linksfu
// @namespace   linksfu.com
// @description Remove ad redirector in links
// @include     http://linksfu.com/*
// @version     1.11
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @grant none
// ==/UserScript==

$('a').each(function(index, value) {   
    value.href = value.href.replace('http://adf.ly/911363/', '');
    var urlRegex = /^https?:\/\//;
    var anchor = $(this).text();
    if (urlRegex.test(anchor)) {
        value.href = anchor;
    } 
});