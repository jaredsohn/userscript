// ==UserScript==
// @name       Anxiety-Free Tumblr Page Titles
// @namespace  http://chibisokka.tumblr.com
// @version    0.1
// @description  Removes the (n) from the document title of tumblr pages.
// @match      http://tumblr.com/*
// @copyright  2012+, You
// ==/UserScript==

// Give the document a reasonable title.
document.title = 'Tumblr';

// Turn the document title setter into a no-op.
Object.defineProperty(document, 'title', {
    get: function () {
        return 'Tumblr';
    }
});