// ==UserScript==
// @name          Disallow stylesheets on r/Bloodlinechampions
// @namespace     http://www.reaverxai.com/
// @description   
// @include       http://www.reddit.com/r/bloodlinechampions*
// @include       http://www.reddit.com/r/Bloodlinechampions*
// @include       http://www.reddit.com/r/BloodlineChampions*
// ==/UserScript==

document.styleSheets[1].disabled = true;