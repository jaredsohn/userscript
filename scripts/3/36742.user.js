// ==UserScript==
// @name           Bigger Google Maps
// @namespace	     http://po-ru.com/
// @description    Hide everything except the map. Good for small screen devices.
// @include        http://maps.google.*
// ==/UserScript==

BiggerGoogleMaps = {
  setStyles: function(){
    GM_addStyle('.noprint, #mclip, #ds, #guser, #header, #links, #panel { display: none !important; }');
    GM_addStyle('#map { left: 0 !important; top: 0 !important; width: 100% !important; }');
  },

  resizeMap: function(){
    var map = document.getElementById('map');
    if (!map) {
      setTimeout(BiggerGoogleMaps.resizeMap, 100);
      return;
    }
    map.style.height = document.documentElement.clientHeight + 'px';
  }
};
BiggerGoogleMaps.setStyles();
BiggerGoogleMaps.resizeMap();
