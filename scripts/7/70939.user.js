// ==UserScript==
// @name           YouTube Age Restriction Bypass
// @namespace      http://userscripts.org
// @description    Bypasses YouTube Age Restriction
// @include        http://youtube.*/verify_age?next_url=/watch*
// @include        http://*.youtube.*/verify_age?next_url=/watch*
// ==/UserScript==

var curURL = document.location.href;
var regexp = /erify_age\?next_url=\/watch\%3Fv%3D/;
curURL = curURL.replace(regexp,"/");
window.location = (curURL);