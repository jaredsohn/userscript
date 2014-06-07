// ==UserScript==
// @name Bypass Windows Live SmartScreen
// @description Bypasses the Windows Live SmartScreen page.
// @version 1.2
// @run-at document-start
// @include http://link.smartscreen.live.com/*&l=*
// ==/UserScript==

window.location.href = window.atob(unescape(document.URL).match(/\&l=(.*?)\&/)[1]);