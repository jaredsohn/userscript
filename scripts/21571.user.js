// ==UserScript==
// @name WWW KILLER >D
// @description This Kills the WWW from websites.
// @namespace http://gaiaonline.com/p/`Mods
// @include http://www.*
// @include www.*

// ATTENTION: Some sites, such as www.google.com and www.msn.com will automatically add www if // not present, creating a loop. The only work around is to add sites like these the 
// exclude list.

// ==/UserScript==

window.location.replace(window.location.href.replace(/^(https?\:\/\/)www./, "$1"));