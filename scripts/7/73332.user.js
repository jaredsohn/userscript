// ==UserScript==
// @name           TV Duck Redirector
// @namespace      Adam Rock
// @description    Redirect Frame2 to Frame on TVDuck
// @include        http://www.tvduck.com/frame2.php?view=*
// ==/UserScript==


location.href = location.href.replace("frame2", "frame");