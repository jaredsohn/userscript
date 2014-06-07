// ==UserScript==
// @name           db-lynx-tür-zu-tür
// @namespace      Oliver Prygotzki
// @description    Erweitert Text-Fahrplanauskunft DB um Tür-zu-Tür- und POI-Routing
// @include        http://reiseauskunft.bahn.de/bin/query.exe/dl*
// @include        http://reiseauskunft.bahn.de/bin/query2.exe/dl*
// @copyright      Oliver Prygotzki
// @version        1.0
// @license        Creative Commons Attribution-Noncommercial 3.0 Germany License
// ==/UserScript==

(function($) {

try {

document.getElementsByName('REQ0JourneyStopsSA')[0].value = 7;
document.getElementsByName('REQ0JourneyStopsZA')[0].value = 7;

} catch(e) {}

})();
