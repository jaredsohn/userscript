// ==UserScript==
// @name          About.com Contests - Remove top frame
// @namespace     http://about.com/
// @description   Remove the top frame with advertising that About.com adds to every sweepstakes link
// @include       http://contests.about.com/gi/o.htm*
// ==/UserScript==

var regexp = /zu=(.*)/gi;
var match = regexp.exec(document.location.href);
document.location.href=decodeURIComponent((match[1]+'').replace(/\+/g, '%20'))