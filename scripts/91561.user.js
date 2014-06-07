// ==UserScript==
// @name           Go Away Jimmy
// @namespace      http://twitter.com/benaud
// @description    Go Away Jimmy
// @version        0.1
// @include        http://*.wikipedia.org/*
// @include        http://*.wiktionary.org/*
// ==/UserScript==

(function() {
var RemoveBanner = document.getElementById('siteNotice');
if (RemoveBanner) {
    RemoveBanner.parentNode.removeChild(RemoveBanner);
}
})();
