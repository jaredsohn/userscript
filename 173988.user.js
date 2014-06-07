// ==UserScript==
// @id             iitc-plugin-threeportals@z4r
// @name           IITC plugin: draw links and fields 
// @category       Info
// @version        0.0.2.20130902.170236
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      none
// @downloadURL    none
// @description    [local-2013-09-02-170236] Click on three portals and draw links and field
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==


function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};



// PLUGIN START ////////////////////////////////////////////////////////
window.plugin.threePortals = function() {};
window.plugin.threePortals.layer = L.layerGroup([]);
window.plugin.threePortals.points = new Array(3);
window.plugin.threePortals.pointIndex = 0;
window.plugin.threePortals.STROKE_STYLE = {
  color: '#FF0000',
  opacity: 1,
  weight: 2,
  clickable: false,
  smoothFactor: 10,
};
window.plugin.threePortals.Point = function(lat, lng) {
  this.lat=lat;
  this.lng=lng;
}
window.plugin.threePortals.Point.prototype.equals = function(obj) {
  if(typeof obj != typeof this) return false;
  for(var property in this) {
    if(typeof obj[property] == "undefined") return false;   
    if(obj[property] != this[property]) return false;
  }
  return true;
} 
window.plugin.threePortals.updateLayer = function() {
  window.plugin.threePortals.layer.clearLayers();
  for (var i=0;i<3;i++){
    var a = window.plugin.threePortals.points[i];
    var b = window.plugin.threePortals.points[(i + 1) % 3];
    if (a && b) L.geodesicPolyline([[a.lat,a.lng],[b.lat,b.lng]], window.plugin.threePortals.STROKE_STYLE).addTo(window.plugin.threePortals.layer);
  }
  window.renderUpdateStatus();
}
var setup = function() {
  window.addHook('portalDetailsUpdated', function(e) {
    var loc = e.portalDetails.locationE6;
    var point = new window.plugin.threePortals.Point(loc.latE6/1E6, loc.lngE6/1E6);
    for (var i=0;i<3;i++){
      if (point.equals(window.plugin.threePortals.points[i])) return;
    }
    window.plugin.threePortals.points[window.plugin.threePortals.pointIndex] = point;
    window.plugin.threePortals.pointIndex = (window.plugin.threePortals.pointIndex + 1) % 3;
    window.plugin.threePortals.updateLayer();
  })
  window.addLayerGroup('Three Portals', window.plugin.threePortals.layer, false);
}
// PLUGIN END //////////////////////////////////////////////////////////


if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);


