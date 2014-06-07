// ==UserScript==
// @name           Searching Google for C-ute Correctly
// @namespace      http://kentarok.org/ns/greasemonkey
// @include        http://www.google*
// ==/UserScript==

(function () {
     if (location.search.match(/(?!%22)%E2%84%83-ute(?!%22)|%C2%B0c-ute/))
         location.href = location.href.replace(/%E2%84%83-ute|%C2%B0c-ute/, '"%E2%84%83-ute"');
})();
