// ==UserScript==
// @name           Neoseeker redirect removal
// @namespace      
// @description    Goes directly to pages linked to from Neoseeker, without adding the Neoseeker top frame
// @include        http://www.neoseeker.com/resourcelink.html?rid=*
// ==/UserScript==

var regexp = /.*\/redirector\.php\?url=([^"]*)/gm;

var srcUrl = document.body.innerHTML.match(regexp);
srcUrl = srcUrl[0].replace(regexp, "$1");
srcUrl = decodeURIComponent(srcUrl);

window.location.href = srcUrl;
