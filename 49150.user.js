// ==UserScript==
// @name          AccessFB
// @namespace     http://www.nathanielelkinsistheshit.com/
// @description   Use a secure connection to access FB and bypass Websense
// @include       http://*.facebook.com/*
// ==/UserScript==

(function() {
    window.location.href = window.location.href.replace(/^http:/, 'https:');
})();
