// ==UserScript==
// @name           Ebuddy full screen
// @namespace      http://userscripts.org/users/354712
// @description    Remove banner on the right side from ebuddy.com.
// @include        http://*.ebuddy.com/?startsession=1
// @include        http://*.ebuddy.com/?startsession=1#
// ==/UserScript==

document.body.removeChild(document.getElementById("container-banner"));
document.getElementById("container-app").style.width = "100%";