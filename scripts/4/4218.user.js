// ==UserScript==
// @name            Allakhazam WoW Mob Info
// @namespace       http://www.sunsean.com/
// @description     Only show common drops by default
// @include         http://wow.allakhazam.com/db/mob.html*
// ==/UserScript==

////////////////////////////////////////////////
// Common Drops Only

document.getElementById('commondrops').style.display = 'block';
document.getElementById('alldrops').style.display = 'none';
