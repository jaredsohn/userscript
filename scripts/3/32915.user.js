// ==UserScript==
// @name           Tribal Wars - Sit My Account
// @namespace      ~dkhal~
// @include        http://en*.tribalwars.net/game.php*
// @include        http://*tribalwars.net/sid_wrong.php
// @copyright dkhal
// ==/UserScript==


// Keeps you logged on and prevents the session expiry
// This script requires my other script (Auto log in to tribalwars)
// http://userscripts.org/scripts/review/32405 instructions are inside to 

if(document.location.href.indexOf("sid_wrong.php")!="-1"){ // If the session expires it redirects to the main page so my other script relogs you on
document.location.href="http://www.tribalwars.net";
}
if(document.location.href.indexOf("game.php?screen=")!="-1"){ // If you are still logged on
window.setTimeout("document.location.href=document.location.href",90000); // Refreshes the page every 1.5 minutes
}