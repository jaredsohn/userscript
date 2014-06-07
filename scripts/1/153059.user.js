// ==UserScript==
// @name         Direct Imgur Links on Reddit
// @description  Change all imgur links to direct image links
// @version      1.0
// @license      Public Domain
// @include      http://*.reddit.com/*
// @require      http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$('a[href^="http://imgur.com/"]').each(function() {
    if (!this.href.match(/\/a\//) &&  // Skip albums
        !this.href.match(/(png|gif|jpg)$/)) {
        var hash = this.href.match(/\w+$/)[0];
        this.href = 'http://i.imgur.com/' + hash + '.jpg';
    }
});
