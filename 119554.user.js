// ==UserScript==
// @name           ArtsjournalSkip
// @description    Move directly to the article from an page from the 
//                 artsjournal rss feed
// @namespace      -oxo-
// @include        http://www.artsjournal.com/artsjournal1/*
// ==/UserScript==

var divs = document.getElementsByTagName('div');
for (var idx in divs) {
    var div = divs[idx];
    if (div.getAttribute('id') == 'item') {
        var as = div.getElementsByTagName('a');
        var url = as[0].getAttribute('href');
        // alert(url);
        document.location = url;
        break;
    }
}

