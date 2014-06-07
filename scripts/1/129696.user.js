// ==UserScript==
// @name       ROBLOX - Background(Gradient)
// @namespace  http://www.roblox.com/User.aspx?ID=22400574
// @version    0.2
// @description  Creates a feel for how it once was prior to the background change, made by Enumeration.
// @match      http://www.roblox.com/*
// @copyright  2012, xHTMLx
// ==/UserScript==
var Colors = [ ' #041452 ', ' #2989d8 ', ' #0a62c8 ' ]; // Edit the colors. 
window.onload = function() { document.getElementById("Container").style.cssText = "background: -webkit-linear-gradient(top, " + Colors[0] + " 0%, " + Colors[1] + " 25%," + Colors[2] + " 100%) !important; background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, " + Colors[0] + " ), color-stop(25%, " + Colors[1] + "), color-stop(100%, " + Colors[2] + ")) !important;"; }


/* 

Please send all PMs regarding this to xHTMLx/Enumeration on ROBLOX. To change the color just edit the variable "Color". 
Programming++

*/