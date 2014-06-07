// ==UserScript==
// @name       VirginMedia Pirate Bay link fix  
// @namespace  http://www.twitter.com/robtaylor84
// @version    0.3
// @description  Switch The Pirate Bay links to use a proxy url, as Virgin Media (UK) have blocked access to TPB.
// @match      *
// @copyright  2012+, Rob Taylor
// ==/UserScript==
(function () {
    var len = document.links.length,
        i = 0;
    for (; i < len; ++i) {
        document.links[i].setAttribute('href', document.links[i].getAttribute('href').replace(/thepiratebay.org/, 'piratebay.me.uk'));
    }
}());