// Based on OpenDNS Search Fixer by Andrew
//     http://userscripts.org/scripts/show/8040
//
// Uses location.replace instead of direct assignment to avoid leaving
// the OpenDNS search page (and thus the redirect) in the history. Also
// uses a more robust scheme: rather than attempting to match the base,
// this version simply parses out the search terms.
//
// ==UserScript==
// @name           OpenDNS Search Replace
// @namespace      artanis00
// @description    Not quite as good as a plain old NXDOMAIN, but better than the OpenDNS not found page.
// @include        http://guide.opendns.com/?url=*
// ==/UserScript==

(function() {
    window.location.replace("http://www.google.com/search?q=" + window.location.href.match(/url=(.*)/)[1]);
})();
