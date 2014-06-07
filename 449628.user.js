// ==UserScript==
// @name        Clickable GameFAQs Links
// @description Changes URL text inside posts into clickable links.
// @namespace   http://userscripts.org/users/527104
// @include     *gamefaqs.com/boards/*
// @version     1.1.2
// @grant       none
// ==/UserScript==

var regex = /(https?\:\/\/)+[\w\.\/\-\?=\(\)&]*/gi;

$("td.msg").each(function() {
    var text = $(this).html();
    
    $(this).html(text.replace(regex, function(match) {
        console.log(match);
        return "<a href='" + match + "' target='_blank'>" + match + "</a>";
    }));
});