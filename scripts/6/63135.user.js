// ==UserScript==
// @name           Random LV Fiction Finder
// @namespace      Karen's Variant on Norton's Random LV Script
// @description    Add a link to a random LibriVox catalog page
// @include        http://librivox.org/*
// @exclude        http://librivox.org/forum/*
// ==/UserScript==
// based on code by http://henrik.nyh.se
// my variation on Norton's original random book finder

// DISCLAIMER: this code comes with no warranty. Use at your own risk.

document.addEventListener('keypress', keyHandler, true);

function eventIsClean(e) {
    var targetTag = e.target.tagName;
    return !e.altKey && !e.ctrlKey && !e.metaKey &&
        targetTag != "TEXTAREA" && targetTag != "INPUT" &&
        e.which == 'l'.charCodeAt(0);
}

function keyHandler(e) {
    if (!eventIsClean(e)) return;

    if(window.location.href.match("newcatalog/search")) {
        var books = document.getElementById('search-results').getElementsByTagName('li');
        var randomBook = Math.floor(Math.random()*books.length);
        window.location.href = books[randomBook].getElementsByTagName('a')[0].href;
        return;
    }
        

    if(e.which == 'l'.charCodeAt(0)) {
    	var page = Math.floor(Math.random()*40)*40;

        var bookpage = 'http://librivox.org/newcatalog/search_advanced.php?'+
            'cat=fiction&status=complete&action=Search&offset=' + page;
        
        window.location.href = bookpage;
    }
}