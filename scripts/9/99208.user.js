// ==UserScript==
// @name		Fark Comments Anchor Fix
// @namespace	Rezz
// @description	Fix Anchors in comments
// @include	http://*.fark.com/comments/*
// @include	http://fark.com/comments/*
// @include     http://www.fark.com/comments/*
// ==/UserScript==

var links = document.getElementsByTagName("a")
var loc = location.href.substring(0,36)

for (i =0; i < links.length; i++) {

    if ( links[i].href.match("#") != null ) {
        if ( links[i].href.match(loc) != null ) {
            links[i].href = links[i].href.substring(links[i].href.indexOf("#"), links[i].href.length);
        }
    }

}
