// ==UserScript==
// @name         Resume Last.fm on Timeout
// @namespace    http://use.i.E.your.homepage/
// @version      0.1
// @description  This will resume the last.fm radio when it times out.
// @description  It looks to see if the Resume Button exists every 10 seconds and if it does it clicks its
// @description  There is probably a more elegant way to do this but this is what I came up with.
// @match        http://www.last.fm/*
// @copyright    2012+, Ben Johnsen
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

setInterval(function () {
    $('form :input').each(function(i){
        if($(this).val() == 'Resume') {
            $(this).click();
        }
    });
}, 10000);