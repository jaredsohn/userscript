// ==UserScript==
// @name          Startpage.com Force Proxy
// @description	  Ensures SSL proxy link.
// @include       http://startpage.com/*
// @include       https://startpage.com/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, 


a = document.getElementsByTagName('a');
for (inc=0;inc<a.length;inc++) {
var regular_link = document.getElementById('title_' + inc);
if (regular_link) {
    regular_link.parentNode.removeChild(regular_link);
}
}