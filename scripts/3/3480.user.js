// ==UserScript==
// @name          set craigslist location
// @namespace     http://spig.net/
// @description   set location to salt lake city craigslist - modify to your preferred city if you want
// @include       http://*.craigslist.org/*
// @include       http://craigslist.org/*
// @date          2006-03-10
// @version       0.1
// @GM_version    0.6.4
// ==/UserScript==

(function() {
    // i don't care about other cities
    if (document.location.href.search(/saltlakecity/i)<0) {
        document.location.href = 'http://saltlakecity.craigslist.org/';
    }
})();
