/* http://greasemonkey.mozdev.org */

// ==UserScript==
// @name            Permalinks in JoS forums
// @namespace       http://www.cs.utexas.edu/~akkartik/greasemonkey
// @description     Adds permalinks to posts in Joel on Software forums
// @include         http://discuss.joelonsoftware.com/*
// ==/UserScript==

(function() {
    var h = document.body.innerHTML;
    document.body.innerHTML = h.replace(/<a name="(discussTopic\d+)">\s*<\/a>/g, '<a href="'+location.href+'#$1" name="$1">#</a>');
})();
