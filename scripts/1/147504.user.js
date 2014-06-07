// ==UserScript==
// @name           Ubers.org - Hide Your Location
// @namespace      Pl0xd/UberLocationhider
// @author         Pl0xd
// @description    Hide your current location from stalkers.
// @include        http://www.ubers.org/*
// @include        http://ubers.org/*
// @run-at         document-start
// @version        1.0
// ==/UserScript==

// Make a little request to the main forum page to reset the "Now Viewing" status.
GM_xmlhttpRequest({
    method: 'HEAD',
    url: 'http://www.ubers.org/index.php'
});