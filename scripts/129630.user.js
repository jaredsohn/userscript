// ==UserScript==
// @name       ROBLOX - Background
// @namespace  http://www.roblox.com/User.aspx?ID=22400574
// @version    0.2
// @description  Fixes the background, made by Enumeration.
// @match      http://www.roblox.com/*
// @copyright  2012, xHTMLx
// ==/UserScript==

var Color = "#333333";
var id = [ "Body", "Container" ];

for (var i = 0; i < 2; i++){
    window.onload = function() {
document.getElementById(id[i]).style.cssText = 'background: ' + Color + ' !important';
}
}

/* 
Please send all PMs regarding this to xHTMLx/Enumeration on ROBLOX. To change the color just edit the variable "Color". 
Programming++
*/