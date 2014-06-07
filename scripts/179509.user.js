// ==UserScript==
// @name        GC - Naturschutzgebiete RLP
// @description Show nature reserves in Rhineland-Palatinate on gc.com map
// @namespace   c0re
// @include     http://www.geocaching.com/map*
// @version     1
// @grant       none
// ==/UserScript==

window["NsgRlp"] = function() {
    if(!window.MapSettings.Map){
        setTimeout(function(){ window["NsgRlp"]()}, 10);
    }
    else {
        var nsg = L.tileLayer.wms('http://map1.naturschutz.rlp.de/service_lanis/mod_wms/wms_getmap.php?mapfile=naturschutzgebiet',{
            Layers : 'naturschutzgebiet',
            transparent : true,
            format : 'image/png',
            opacity : 0.4
        }).addTo(window.MapSettings.Map).bringToFront();
    }
};
window["NsgRlp"]();
