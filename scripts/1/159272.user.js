// ==UserScript==
// @name           Google Reader: Go to first unread entry
// @version        1.0
// @namespace      http://www.lunrfarsde.com
// @match          http*://www.google.*/reader/view/*
// @require        http://code.jquery.com/jquery-1.9.0.min.js
// @description    Scrolls to first unread entry in a stream when Alt+Shift+n is pressed
// ==/UserScript==
var startEntry;
function goToFirstUnread() {
    currentEntry = startEntry;
    while (currentEntry.nextSibling.id != 'scroll-filler') {
        currentEntry = currentEntry.nextSibling;
        if ($(currentEntry).find('.read-state-read').length > 0) {   //found last read item, return
            currentEntry.scrollIntoView();
            return;
        }
    }            
    if (currentEntry != startEntry) {
        startEntry = currentEntry;
        startEntry.scrollIntoView();
        setTimeout(function() {                                 
            goToFirstUnread();
        }, 2000);
    }
}    
$(document).keydown(function (e) {
    var key = String.fromCharCode(e.which).toLowerCase();
    if (key == "n" && e.altKey && e.shiftKey) { 
        startEntry = $('.entry-0')[0];
        goToFirstUnread(); 
    }
});