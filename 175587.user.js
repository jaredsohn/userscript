// ==UserScript==
// @name            Gaia Online "Welcome back" fix
// @description     Adds a comma after "Welcome back". Grammar, man.
// @author          Sheldon Corcoran (Awesomolocity)
// @icon            http://gaiaonline.com/favicon.ico
// @homepageURL     http://userscripts.org/scripts/show/175587
// @downloadURL     http://userscripts.org/scripts/source/175587.user.js
// @updateURL       http://userscripts.org/scripts/source/175587.meta.js
// @namespace       http://awesomolocity.info
// @version         1.0.1
// @include         http*://*.gaiaonline.com/
// @include         http*://gaiaonline.com/*
// ==/UserScript==

//All code is copyright to Sheldon Corcoran (Awesomolocity)
//You may not use this without written or typed consent from Sheldon Corcoran (Awesomolocity)
//To get consent, email me at awesomolocity@gmail.com

//Clearly the most important user script of all time.
document.getElementsByClassName('avatarName')[0].innerHTML = (document.getElementsByClassName('avatarName')[0].innerHTML.indexOf('Welcome back,') == -1)?document.getElementsByClassName('avatarName')[0].innerHTML.replace('Welcome back', 'Welcome back,'):document.getElementsByClassName('avatarName')[0].innerHTML