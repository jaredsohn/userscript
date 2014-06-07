// ==UserScript==
// @namespace     http://www.splintor.com/userscript
// @name          Show Bugzilla bugs in print format
// @description   Make Bugzilla bugs always displayed in print format
// @include       https://bugzilla.mozilla.org/show_bug.cgi?id=*
// ==/UserScript==

location.search = location.search.replace(/\?/, "?format=multiple&")
