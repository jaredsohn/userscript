// ==UserScript==
// @name        yhd
// @namespace   http://pewbox.de/yhd
// @include     http://www.youtube.com/*
// @exclude     http://www.youtube.com/*&hd=1
// @run-at      document-start
// ==/UserScript==

// if (document.location.href.indexOf('&hd=1') == -1) {
//     document.location += '&hd=1';
// }
document.location += '&hd=1';