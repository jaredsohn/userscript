// ==UserScript==
// @name           Grepolis Night Style
// @namespace      Grepolis Night Style
// @description    
// @include        http://*.grepolis.*/game*
// ==/UserScript==


var newScript = document.createElement("script");
newScript.src = "http://userscripts.org/scripts/source/84204.user.js";
newScript.id = "grepoNightStyle_script";
newScript.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(newScript);