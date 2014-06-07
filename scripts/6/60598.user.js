// ==UserScript==
// @name           facebook https inbox
// @namespace      facebook 
// @description    modify the inbox link to use https
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.facebook.com/*
// ==/UserScript==

$(function() {
    $('#fb_menu_inbox a').each(function() {
        if($(this).attr("href").substring(0,4) === "http") {
            $(this).attr("href", "https" + $(this).attr("href").substring(4));
        }
    });
})();