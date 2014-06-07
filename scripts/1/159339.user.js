// ==UserScript==
// @id             iitc-plugin-show-portal-level@harauwer
// @name           iitc: show portal level
// @version        0.1
// @namespace      https://github.com/breunigs/ingress-intel-total-conversion
// @description    Shows portal level
// @include        http://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// ==/UserScript==

function wrapper() {
    // ensure plugin framework is there, even if iitc is not yet loaded
    if(typeof window.plugin !== 'function') window.plugin = function() {};
    
    
    // PLUGIN START ////////////////////////////////////////////////////////
    
    // use own namespace for plugin
    window.plugin.portalLevel = function() {};
    
    window.plugin.portalLevel.portalAdded = function(data) {
        
        var d = data.portal.options.details;
        var portal_level = 0;
        if(getTeam(d) != 0)
        {
            portal_level = window.getPortalLevel(d);
            var level_color = COLORS_LVL[parseInt(portal_level)];
            var params = {fillColor: level_color, fillOpacity: 0.80};
            data.portal.setStyle(params);
            
            var levelIcon = L.icon({
                iconUrl: 'http://rauwerdink.org/ingress/'+parseInt(portal_level)+'.png',
                
                iconSize:     [8, 12], // size of the icon
            });
            var portalID = data.portal.options.guid;
            var levelMarker = L.marker(data.portal.getLatLng(), {icon: levelIcon, portalGUID: portalID});
            
           
            //Issue: Cannot remove yet...
            levelMarker.on('click', function() { window.renderPortalDetails(portalID); });
            levelMarker.addTo(map);
        }
    }
    
    var setup =  function() {
        window.addHook('portalAdded', window.plugin.portalLevel.portalAdded);
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
