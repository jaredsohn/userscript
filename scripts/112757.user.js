// ==UserScript==
// @name           Waypoint Gamma Bravo
// @namespace      http://userscripts.org/users/381173
// @description    Fixes the whitespace
// @include        http://halo.xbox.com/Gamma/*
// @include		   https://halo.xbox.com/Gamma/*
// ==/UserScript==
// Author 		   Der Flatulator6

var x = document.styleSheets[1];
x.insertRule('.message { vertical-align: top; !important }',x.cssRules.length);
x.insertRule('.section { color: #333; !important }',x.cssRules.length);
var y = document.getElementById('DivPageAccess')
y.innerHTML = ""