// ==UserScript==
// @name       Twitter Timestamp Rightize
// @namespace  http://aycabta.github.io/
// @version    0.1
// @description  Oops
// @include    https://twitter.com/*
// @copyright  2014+, Code Ass
// ==/UserScript==

(function() {
    var style = document.createElement('style');
    style.type = "text/css";
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
    
    var sheet = style.sheet;
    sheet.insertRule('.tweet-timestamp { float: right; }', sheet.cssRules.length);
})();
