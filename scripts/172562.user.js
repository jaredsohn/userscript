// ==UserScript==
// @id             iitc-plugin-highlight-portals-by-MOD
// @name           IITC plugin: highlight portals by MOD
// @category       Highlighter
// @version        0.1
// @description    Highlight portals by MOD
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// @copyright  2013+, t2k269
// ==/UserScript==


function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.portalHighligherPortalMOD = function() {};


window.plugin.portalHighligherPortalMOD.highlight = function(data) {
    var d = data.portal.options.details;
    var mods = d.portalV2.linkedModArray;
    var totalRarity = 0;
    for (var i = 0; i < mods.length; i++) {
        var mod = mods[i];
        if (mod != null) {
            if (mod.type == "RES_SHIELD") {
                totalRarity += parseInt(mod.stats.MITIGATION);
            } else {
                if (mod.rarity == "COMMON") {
                    totalRarity += 10;
                }
                if (mod.rarity == "RARE") {
                    totalRarity += 20;
                }
                if (mod.rarity == "VERY_RARE") {
                    totalRarity += 30;
                }
            }
        }
    }
    var opacity = (totalRarity / 120.0);
    if(opacity < 0) {
        opacity = 0;
    }
    if(opacity > 1) {
        opacity = 1;
    }
    data.portal.setStyle({fillColor: 'red', fillOpacity: opacity});
}

var setup =  function() {
  window.addPortalHighlighter('MOD', window.plugin.portalHighligherPortalMOD.highlight);
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