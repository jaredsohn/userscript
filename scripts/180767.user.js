// ==UserScript==
// @name        FanFiction Automatically Show All in Crossovers
// @namespace   MeinHimmel,2007-08-05:greasemonkey
// @grant none
// @description Automatically selects to show all ratings and sort by most favorited first
// @include http://www.fanfiction.net/*/224/*/
// @include http://www.fanfiction.net/*/224/
// @exclude http://www.fanfiction.net/crossovers/*/224/
// ==/UserScript==
window.location.href = window.location.href + "?&srt=4&r=10";
