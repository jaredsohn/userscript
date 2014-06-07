// ==UserScript==
// @name radar.bourky.cz - Google Maps
// @description Allows you to use Google Maps on radar.bourky.cz
// @namespace http://radar.bourky.cz
// @include http://radar.bourky.cz/*
// @licence CC-BY-SA 3.0 http://creativecommons.org/licenses/by-sa/3.0/
// @copyright	2013, jenda^^ aka jen_ovecka (http://www.ovecka.maweb.eu/)
// @version	1.2
// @updateURL http://userscripts.org/scripts/source/187061.user.js
// @downloadURL http://userscripts.org/scripts/source/187061.user.js
// @grant none
// @run-at document-end
// ==/UserScript==
// 
// v1.2:
//    fix for Firefox+Greasemonkey
// 
// v1.1:
//    fix for Chrome+Tampermonkey
// 

var gmstreet, gmsat

function initgmap()
{
  //define maps
  gmstreet = new OpenLayers.Layer.OSM("Google Maps", ["http://mt.google.com/vt?&x=${x}&y=${y}&z=${z}"], {
      attribution: "<a href=\'http://maps.google.com/\'>Google</a> Maps",
      transitionEffect: "resize",
      numZoomLevels: 20
  });
  map['addLayer'](gmstreet);
  
  gmsat = new OpenLayers.Layer.OSM("Google Maps", ["http://mt.google.com/vt?lyrs=s&x=${x}&y=${y}&z=${z}"], {
      attribution: "<a href=\'http://maps.google.com/\'>Google</a> Maps",
      transitionEffect: "resize",
      numZoomLevels: 22
  });
  map['addLayer'](gmsat);
  
  //change map select menu    
  document.getElementById('map_type').onchange = function() { custom_change_map(); }
  first_option = document.getElementById('map_type').options[0];
  
  //add maps to map select
  gmstreet_s = document.createElement('option');
  gmstreet_s.value = "gmstreet";
  gmstreet_s.innerHTML = "Google Maps";
  document.getElementById('map_type').add(gmstreet_s, first_option);
  
  gmsat_s = document.createElement('option');
  gmsat_s.value = "gmsat";
  gmsat_s.innerHTML = "Google Maps Satellite";
  document.getElementById('map_type').add(gmsat_s, first_option);
  
  //change map to Google Maps
  window.document.getElementById('map_type').selectedIndex = 0;
  custom_change_map();
}

//function for custom maps
function custom_change_map()
{
  sel_map = window.document.getElementById('map_type').options[window.document.getElementById('map_type').selectedIndex].value
  if (sel_map == "gmstreet") {
    map.setBaseLayer(gmstreet);
    return;
  }
  if (sel_map == "gmsat") {
    map.setBaseLayer(gmsat);
    return;
  }
  
  //if selected other than custom map, use original function
  change_map();
}

//Workaround function for Firefox, I don't have any idea why it doesn't work
//with plain "initgmap();" as in Opera and Chrome
function checkstart() {
  if (!map)
    setTimeout(checkstart,100);
  else {
    initgmap();   
  }
}

checkstart();