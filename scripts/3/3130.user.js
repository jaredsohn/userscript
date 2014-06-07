// ==UserScript==
// @namespace     http://www.splintor.com/userscript
// @name          Show Bugzilla bug ID in title
// @description   Show Bugzilla bug ID title when viewing it in print format
// @include       https://bugzilla.mozilla.org/show_bug.cgi?format=multiple&id=*
// ==/UserScript==

document.title = "Bug " + location.search.match(/id=(\d+)/)[1] + " - " + document.title;
