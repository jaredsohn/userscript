// ==UserScript==
// @name          Developer.com Printer Friendly Articles
// @namespace     http://www.unixdaemon.net/gmscripts/
// @description   Redirect to print friendly version of the current Developer.com article
// @include       http://developer.com/*
// @include       http://www.developer.com/*
// ==/UserScript==

(function() {

if (window.location.href.match(/article.php/)) {
  window.location.replace(window.location.href.replace(/article.php/, "print.php"));
}

})();
