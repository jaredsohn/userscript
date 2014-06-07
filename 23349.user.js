// ==UserScript==
// @name           Flashback Leave
// @namespace      Kuzmin @ userscripts.org
// @include        *flashback.org/leave.php*
// ==/UserScript==

var Anchors = document.getElementsByTagName("a");
window.location.href = Anchors[1].href;