// ==UserScript==
// @name           Identi.ca Map Removal
// @namespace      hKVtaod4nD
// @description    Fact: The majority of Identi.ca users do not live near the South Pole
// @lastupdated    2010-07-04
// @version        1.1
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 3.6
// @include        http://identi.ca/*
// @include        https://identi.ca/*
// ==/UserScript==

var map = document.getElementById('entity_map');
if (map) {
    map.parentNode.removeChild(map);
}