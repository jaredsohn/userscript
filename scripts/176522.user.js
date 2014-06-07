// Facebook Old Favicon ['09-'13]
// 2013
// from FalkeXY 2013
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facebook Old Favicon ['09-'13]
// @namespace     ---
// @description   Replaces Facebooks Favicon with the one from 2009 to 2013 - by FalkeXY
// @source        ---
// @include       http://*.facebook.com/*
// @include       http://facebook.com/*
// @include	  https://*.facebook.com/*
// @include	  https://facebook.com/*
// @version       1.0
// ==/UserScript==

var pitas = document.createElement('link');
pitas.setAttribute('rel', 'shortcut icon');
pitas.setAttribute('href', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAH1JREFUOE9joApIrFzz3zpyBkkYpAeqnYEBmwJiMFQ7YQMSKlb/f/3uy38YgIlDtRM2AFkzCMDEodoJGwAD6OJQ7TQ0ABeAyUO14zYA5Hdk/8P4MHmo9sEcBjAMA+jiUO0MDK5J8/7ntmzBiWEAWQykB6qdCgZQnJnIBwwMAGeM72QXNnpHAAAAAElFTkSuQmCC");

var head = document.getElementsByTagName('head')[0];
head.appendChild(pitas);

// 1.0	Initial release.