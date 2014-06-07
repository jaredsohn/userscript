// ==UserScript==
// @name           CHF - Hide Your Location
// @namespace      Pl0xd/Locationhider
// @author         Pl0xd
// @description    Hide your current location from stalkers.
// @include        http://www.crackhackforum.com/*
// @include        http://crackhackforum.com/*
// @run-at         document-start
// @version        1.0
// ==/UserScript==

// Make a little request to the main forum page to reset the "Now Viewing" status.
GM_xmlhttpRequest({
    method: 'HEAD',
    url: 'http://www.crackhackforum.com/index.php'
});