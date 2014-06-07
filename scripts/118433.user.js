// LOAD THIS SCRIPT ON GREASEMONKEY
// ==UserScript==
// @name           Bypass facebook's link proxy (l.php)
// @namespace      kox_wins
// @description    When you click on a external link Facebook redirects to facebook.com/l.php?u=….  Load this script to greasemonkey to bypass the proxy and go directly to the link
// @include        http://s-static.ak.facebook.com
// @include        https://s-static.ak.facebook.com
// @include        https://www.facebook.com/
// @include        http://www.facebook.com/
// ==/UserScript==

// declare UntrustedLink initially
function UntrustedLink(a,d,b,c){return;};

// periodically redeclare UntrustedLink.bootstrap
setInterval('UntrustedLink.bootstrap=function(a,d,b,c){};', 1500);