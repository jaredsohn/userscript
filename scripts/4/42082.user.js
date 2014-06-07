// ==UserScript==
// @name Google FavIcon Alternative
// @author Brian Enigma
// @namespace http://netninja.com
// @description Changes the new Google favicon (lowercase "g" with multicolor background) to the less-offensive multicolor contest winner icon it was based on (see: http://googleblog.blogspot.com/2009/01/googles-new-favicon.html)
// @license Creative Commons Attribution License
// @version 1.0
// @include http*://www.google.com/*
// @include http*://google.com/*
// @include http*://maps.google.com/*
// Exclude mail & reader, as they already have perfectly fine icons
// @exclude http*://google.com/reader/*
// @exclude http*://google.com/calendar/*
// @exclude http*://mail.google.com/*
// @exclude http*://www.google.com/reader/*
// @exclude http*://www.google.com/calendar/*
// @released 2009-01-26
// @updated  2009-01-27 - added Google Maps to the includes
// @compatible Greasemonkey
// ==/UserScript==
/*
 * This file is a Greasemonkey user script. To install it, you need
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 *
 * To uninstall this script, go to your "Tools" menu and select
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * Creative Commons Attribution License (--> or Public Domain)
 * http://creativecommons.org/licenses/by/2.5/
*/

// Get the (first, and presumably only) head element
var head = document.getElementsByTagName('head')[0];
// Prepare a "link" element
var favIcon = document.createElement('link');
favIcon.setAttribute('type', 'image/x-icon');
favIcon.setAttribute('rel', 'shortcut icon');
favIcon.setAttribute('href', 'data:image/png;base64,' +
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/' +
        'oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9kBGhMjAFvoE0QAAALCSURBVCjPZZBJSJRx' +
        'AMXf/1tm5hsbnZYZy1xIDVsoWiXrkLTSSkib4SFosYjqEFTUwYNBEXXr0CEoqCiCoPVQGQS2kU5EBgqW' +
        'Npajjd/MfLN8+////zpYXXq84++9B4/kCtb1+119AyoIHJcd2F4/d1akV/seUcKVxaUEsNKqnhj6/uhe' +
        'IFpat+eAyMINnbG4ZbspzTjUvGzF4qr2DzcvdN291fdyUXRmRShCRLH7/CkjmcgNfcsO9AudsbhuOsm0' +
        'HiryNdbPyNr61Z6nBrVN6ux80q7ZBdHnr2s+aCRH3EJ+LPZG0HJmWjPUjF5TMRmAy2ne1scMTTW0pJ56' +
        'MRQDUFRWaaWSdlq1MynJcRkAyriWNwFMVkpqSqb3qgMQBLhWopAGYPxKOLkcZwyECISAEEiS0PH2q2m5' +
        'BLiz+QyoDkZBnVWVCzml3RdOi4oCAJ4nTqpZC4AALuUfexNrGmqrwpFN1Y2SKLQ1Hq6fUPG8ZV0u3i9I' +
        'EgAApHbtRfyVS5ksCXu3LV4wq3zTqjoAr47sGu7s+FP/fwAA555uOlMmTuh5fJwQkv8Zf7hhoej3EfHP' +
        'gvAP9bxxtGj/juWHm5daNgMQKq/a+rgrMLWcUcoBDpDa1e0AOOOKX7p8tml1w0xuD9raK9vO+II1oegW' +
        'IshWVruxsk6SZQCSRw0AnLHXD9vCxcHBDy1q/LbnYdxKeMH89bFASXhe68l3V85LgYAEZtq2e6J1Y7g4' +
        'aBaG+z7dFmU/4xi/Ts18ig4+mFbdFCyryDNP5pC4q3PqlkVCAEDklAbJJ3I+/giog7Hkt2nVGPzy2SCC' +
        'yDxBkangmfcedHiepxRFqxedG/lljCaNpGqPjBoFJzpnybHM6Miz61cNIlmyn7zv/tLS2mZZ9pF9TUdb' +
        'dweVQD47mvjZk00Pl06fHS2d/aP/66V9uxzLJIScvHbnN7/nZ8fxooOLAAAAAElFTkSuQmCC');
// Append the "link" item to the end (so that it overrides any previous link elements)
head.appendChild(favIcon);
