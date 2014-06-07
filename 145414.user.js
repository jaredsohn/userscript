// ==UserScript==
// @name       SelectSmart Pro
// @namespace  http://www.selectsmart.com/
// @version    0.2
// @description  Various improvements for the SelectSmart forums
// @match      http://www.selectsmart.com/DISCUSS/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var timeout = 12 * 60 * 1000;
var timerId = 0;

function reload() {
    if (!document.hasFocus()) location.reload();
}

function startAutoReload() {
    if (timerId != 0) clearTimeout(timerId);
    timerId = setTimeout(reload, timeout);
}

$(document).ready(function() {
    // Hide the footer and header
    $('body > table:lt(2)').hide();
    $('.PhorumFooterPlug').hide();
    
    // Stuff for read.php pages...
    if (/.*read\.php.*/.test(document.URL)) {
        
        // Add unread count to the title
        var newCount = $('.new-flag').length;
        document.title = '(' + newCount + ') ' + document.title;
        
    }
    
    // Stuff for list.php pages...
    if (/.*list\.php.*/.test(document.URL)) {
        
        // Add 'Hide Messages' to moderator shortcuts
        $('#phorum table.list td:last-child small').each(function(index) {
            var matches = /([0-9]+),3,([0-9]+)">Move Topic<\/a>/.exec($(this).html());
            if (matches == null) return;
            $(this).append('<br />&raquo; <a href="http://www.selectsmart.com/DISCUSS/moderation.php?'
                           + matches[1] + ',8,' + matches[2] + '">Hide Topic</a>');
        });
        
        // Add unread count to the title
        var newCount = $('.new-indicator').length;
        var pageTitle = /.* :: (.*)/.exec(document.title)[1];
        document.title = '(' + newCount + ') ' + pageTitle;
        
        // Automatically relead pages if window isn't focussed
        if (!document.hasFocus()) startAutoReload();
        window.onblur = startAutoReload;
    }
});
