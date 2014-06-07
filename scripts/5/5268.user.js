// ==UserScript==
// @name          Scientific American.com Printer Friendly Articles
// @namespace     http://www.unixdaemon.net/gmscripts/
// @description   Redirect to print friendly version of the current
//                Scientific American.com article
// @include       http://sciam.com/*
// @include       http://www.sciam.com/*
// ==/UserScript==

(function() {

if (window.location.href.match(/article.cfm/)) {
  window.location.replace(window.location.href.replace(/article.cfm/, "print_version.cfm"));
}

})();
