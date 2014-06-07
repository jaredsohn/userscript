// ==UserScript==
// @name           Grepolis Night Style
// @namespace      Grepolis Night Style
// @description    Fügt einen Nachtmodus in Grepolis ein
// @include        http://*.grepolis.*/game*
// ==/UserScript==


var newScript = document.createElement("script");
newScript.src = "http://www.grepotools.de/tonda/grepoNightStyle/grepoNightStyle.js";
newScript.id = "grepoNightStyle_script";
newScript.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(newScript);