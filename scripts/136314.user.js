// ==UserScript==
// @name           Change Font Colors
// @namespace      namesake
// @description    basic test script to show different color
// @include        www.google.com
// @copyright      Meta
// @version        v1.0
// @license        URL to it if it has one
// @require        URL that Greasemonkey uses to update script to a later version
// ==/UserScript==

//Goal is to check basis color changing functionality through a GM script
 document.bgColor = "Black";
 with (document.getElementById("paragraph1"))
 {
  style.fontFamily = "Arial";
  style.color = "Lime";
 }

