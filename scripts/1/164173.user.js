// ==UserScript==
// @name           Allegro Shit Remover
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant          none
// @namespace      http://www.cmza.pl/gm-scripts
// @description    Skrypt usuwajacy zmiany Allegro (belka zmiany layoutu, cookie i polecane)
// @include        http*://*allegro.pl*
// ==/UserScript==

// remove layout bar
$("#toggle-layout-bar").remove();

// remove cookie policy
$("#cookie-policy-banner").remove();

// remove recomended
$(".recommendedGalleryWrapper").remove();

// remove promotions from main page
$("#promoItems").remove();
