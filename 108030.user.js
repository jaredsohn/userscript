// ==UserScript==
// @name           Remove Sidebar
// @namespace      YouTubeIsACashCow
// @include        http://www.youtube.com/
// ==/UserScript==

// Extremely easy script, no need to take credit for it. homepage-main-content

// Replace Sidebar with nothing... or something else you want.
//document.getElementById('homepage-side-content').innerHTML = ""; 

// Old way of setting width.
/*var hsc = parseInt(document.getElementById('homepage-side-content').offsetWidth);
alert(hsc);
var hmc = parseInt(document.getElementById('homepage-main-content').offsetWidth);
alert(hmc);
var w = hsc + hmc + "px";*/

// New way of setting Width.
var wBase = parseInt(document.getElementById('baseDiv').offsetWidth) + "px";
document.getElementById('homepage-side-content').style.visibility = "hidden";
document.getElementById('homepage-main-content').style.width = wBase;
