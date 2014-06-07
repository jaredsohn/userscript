// ==UserScript==
// @name           Kill Overture ads
// @namespace      http://pobox.com/~kragen
// @description    Remove server-added Overture ads from Guardian and similar sites.
// @include        *
// ==/UserScript==

x = document.getElementById('OvertureArtTrailDiv');
if(x) x.style.display = 'none'