// ==UserScript==
// @name          Dojo Winner Hider
// @namespace     http://userscripts.org/scripts/show/102671
// @description   Hides the winners for a dojo tournament in Dino-RPG.
// @include       http://en.dinorpg.com/dojo/tournament*
// @require       http://code.jquery.com/jquery-1.6.min.js
// @version       1.0
// ==/UserScript==

$(document).ready(function () {
    $("div.vsdino:not(.vsdinoLost)").addClass("vsdinoLost");
});
