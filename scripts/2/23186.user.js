// ==UserScript==
// @name          Google Reader Printable Embedded.com
// @description   Replace Embedded.com urls in Google Reader with printable version
// @include       https://www.google.com/reader/*
// @include       http://www.google.com/reader/*
// ==/UserScript==
//

var decorate_new_elements = function(e) {

    var page_links = document.links;
    for (var i=0; i<page_links.length; i++){
        if (page_links[i].href.match(/embedded_news$/))
        {
            page_links[i].href += '&printable=true';
        }
    }

}
document.body.addEventListener('DOMNodeInserted', decorate_new_elements, false);
