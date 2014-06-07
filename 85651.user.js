// ==UserScript==
// @name          No YouTube Comments
// @namespace     http://userscripts.org/users/benaud
// @description   YouTube comments are less than useless. Remove them.
// @version       0.5
// @include       *://*.youtube.com/*
// ==/UserScript==

(function() {
var removeComments = document.getElementById('watch-discussion');
if (removeComments) {
    removeComments.parentNode.removeChild(removeComments);
}
})();