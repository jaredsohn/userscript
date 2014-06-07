// ==UserScript==
// @name          Pinboard.in bookmarks with favicons
// @namespace     http://userscripts.org/users/260303
// @description   Adds favicons for bookmarks at http://pinboard.in/.
// @author        Maranchuk Sergey <slav0nic0@gmail.com>
// @include       *://pinboard.in/*
// @version       0.2
// ==/UserScript==


var bookmarks = document.getElementsByClassName('bookmark_title');

for (var i = 0; i < bookmarks.length; i++) {
    bookmarks[i].innerHTML = '<img src="https://plus.google.com/_/favicon?domain=' + bookmarks[i].href.split(/\/+/g)[1] + '" /> ' + bookmarks[i].innerHTML;
}

