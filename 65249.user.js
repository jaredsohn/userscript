// ==UserScript==
// @name           Remove Craigslist Scam Alerts
// @description    Link directly to categories instead of the intermediate scam alert pages
// @include        http://*.craigslist.*/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(function() {
  $('a[href^=/cgi-bin]:not([href$=ads])').each(function() {
    this.href = this.href.replace(/cgi-bin\/.+?\.cgi\?&?category=(.+)/, "$1")
  });
});