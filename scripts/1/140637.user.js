// ==UserScript==
// @name            GoogleNoDoodle
// @namespace       http://pomf.eu
// @description     Removes the fucking google doodle.
// @include         http://www.google.*/
// @include         https://www.google.*/
// ==/UserScript==

var doodleContainer = document.getElementById("lga");
doodleContainer.outerHTML = '<div id="lga" style="height:231px;margin-top:-22px"><img alt="Google" src="/images/srpr/logo3w.png" id="hplogo" onload="window.lol&amp;&amp;lol()" style="padding-top:112px" height="95" width="275"></div>'
