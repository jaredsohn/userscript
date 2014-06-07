// ==UserScript==
// @name           Velib Paris Map Fullscreen
// @namespace      http://blog.mapmyglobe.com/
// @author         Julien C
// @description    Displays the Velib stations map in Full Screen 
// @include        http://www.velib.paris.fr/trouver_une_station
// @include        http://www.en.velib.paris.fr/trouver_une_station
// @include        http://www.es.velib.paris.fr/trouver_une_station
// ==/UserScript==


(function() {
  function $(id) {
    return document.getElementById(id);
  }
  
  //location.href = "javascript:void(window.map.enableScrollWheelZoom())";
  /*unsafeWindow.map.enableDoubleClickZoom();
  unsafeWindow.map.enableContinuousZoom();
  unsafeWindow.map.enableScrollWheelZoom();*/
  
  $('map_19075').style.width="100%";
  $('map_19075').style.height="100%";
  $('map_19075').style.top="0";
  $('map_19075').style.left="0";
  $('map_19075').style.position="absolute";
})();