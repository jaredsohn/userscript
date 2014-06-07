// ==UserScript==
// @name        jsblocker
// @description a simple js blocker
// @version     1.0
// @grant       none
// @run-at      document-start
// ==/UserScript==
window.addEventListener('beforescriptexecute', function (e) {
    e.preventDefault();
    e.stopPropagation();
}, true);
