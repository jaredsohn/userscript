// ==UserScript==
// @name         Remove Google Click-tracking
// @description  Removes Google's click-tracking from result links
// @version      1.1
// @license      Public Domain
// @include      *://*.google.tld/*
// ==/UserScript==

Object.defineProperty(unsafeWindow, 'rwt', {
    value: function() {},
    writable: false
});
