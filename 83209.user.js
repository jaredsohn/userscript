// ==UserScript==
// @name           Remove Youtube bottom bar
// @namespace      whateverfaggot
// @description    Removes the new bar at the bottom when viewing reccomended videos.
// @include        http://www.youtube.com/watch?*
// ==/UserScript==
var ql = document.getElementById('quicklist');
ql.parentNode.removeChild(ql);
