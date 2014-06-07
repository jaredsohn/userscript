// ==UserScript==
// @name           channel4 40d remove annoying roll-over ads
// @namespace      http://userscripts.org/users/lorriman
// @include        http://www.channel4.com/programmes/*
// @version .1
// ==/UserScript==

//channel 4 sneakily seems to insert the ad in such a way that we have to wait for it.

unsafeWindow.setTimeout(function(){

document.getElementById('c4ad-Middle1').setAttribute('style','display:none');

},10000);


