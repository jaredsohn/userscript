// ==UserScript==
// @name         Export button in The Old Reader
// @description  Adds an "Export" button next to "Import"
// @version      1.0.0
// @license      Public Domain
// @include      http://theoldreader.com/posts/all
// @grant        none
// ==/UserScript==

$('a[href="/feeds/import"]').parent()
    .after($('<li><a href="/feeds.opml">Export</a></li>'));
