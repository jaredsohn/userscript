// ==UserScript==
// @name          Random LibriVox catalog page
// @namespace     Norton's Arbitrary Namespace
// @description   Add a link to a random LibriVox catalog page
// @include       http://librivox.org/*
// @exclude       http://librivox.org/forum/*
// ==/UserScript==
// based on code by http://henrik.nyh.se

// DISCLAIMER: this code comes with no warranty. Use at your own risk.

document.addEventListener('keypress', keyHandler, true);

function eventIsClean(e) {
    var targetTag = e.target.tagName;
    return !e.altKey && !e.ctrlKey && !e.metaKey &&
        targetTag != "TEXTAREA" && targetTag != "INPUT" &&
        e.which == 'r'.charCodeAt(0);
}

function keyHandler(e) {
    if (!eventIsClean(e)) return;

    if(window.location.href.match("newcatalog/search")) {
        var books = document.getElementById('search-results').getElementsByTagName('li');
        var randomBook = Math.floor(Math.random()*books.length);
        window.location.href = books[randomBook].getElementsByTagName('a')[0].href;
        return;
    }
        

    if(e.which == 'r'.charCodeAt(0)) {
        var year = Math.floor(Math.random()*5)+5; //years between 5 and 9 (i.e., 2005-2009)
        var month= Math.floor(Math.random()*12)+1; //months between 1 and 12
        if(year == 5) {
            month = Math.floor(Math.random()*4)+9; //'05 is only from sept to dec
        }

        var bookpage = 'http://librivox.org/newcatalog/search_advanced.php?'+
            'title=&author=&cat=&genre=&status=all&type=&language='+
            '&date='+ month + '%3A200' + year + '&reader=&bc=&mc=&action=Search';
        
        window.location.href = bookpage;
    }
}