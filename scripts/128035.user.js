// ==UserScript==
// @name           clic0
// @namespace      clic0
// @description    clic0 + roads
// @include        http://clic0.free.fr/api_ign/clic0_gpx.php
// ==/UserScript==

document.body.setAttribute('onload', null);

var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'http://lolo.after.free.fr/userscripts/clic0_visu.js';
headID.appendChild(newScript);

document.body.setAttribute('onload','myLoad(); resizeBigMap();');
