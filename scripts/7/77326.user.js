// ==UserScript==
// @name          Auto Google SSL
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Set
// @include       http://www.google.com/search?q=*
// @include       http://www.google.com/
// ==/UserScript==
(function() {
    window.location.href = window.location.href.replace(/^http:/, 'https:');
})();