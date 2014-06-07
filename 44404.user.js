// ==UserScript==
// @name           HWM_Map_Ext1
// @namespace      http://amse.ru
// @include        http://www.heroeswm.ru/map.php*
// @include        http://www.heroeswm.ru/gnome_war.php*
// ==/UserScript==

var map = document.getElementById('map');
//alert("map = "+map);

var map_embed = map.childNodes[9];

map_embed.setAttribute('width', 500);


// ========== END ===