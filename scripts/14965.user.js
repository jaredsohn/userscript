// ==UserScript==
// @name           StraightToScripts
// @namespace      localhost
// @description    Skip the new userscripts.org top page and go straight to scripts.
// @include        http://userscripts.org/
// ==/UserScript==

var url = window.location.href;
url += "scripts";
window.location.replace(url);
