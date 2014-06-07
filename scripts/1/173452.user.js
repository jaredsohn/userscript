// ==UserScript==
// @name           Force Https Lite
// @description    Force pages to use https with least codes.
// @version        0.1
// @exclude        *
// @grant          none
// @run-at         document-start
// ==/UserScript==

document.location.href = url.replace('http://', 'https://');