// ==UserScript==
// @id             iitc-plugin-portal-owner
// @name           IITC plugin: Portal's Owner
// @version        0.0.3
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      
// @downloadURL    
// @description    The plugins finds the owner of a portal. The input is in the sidebar.
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
    
    /*********************************************************************************************************
* Changelog:
*
* 0.0.3 add portal level and duration in days
* 0.0.2 bug fixed
* 0.0.1 first public release
*********************************************************************************************************/
    
    // use own namespace for plugin
    window.plugin.portalOwner = function() {};
    
    window.plugin.portalOwner.findOwner = function(playername) {
        var s = "";
        var portalSet = {};
        var portalCounter = 0;
        // Assuming there can be no agents with same nick with different lower/uppercase
        var nickToFind = playername.toLowerCase();
        $.each(window.portals, function(ind, portal){
            var nick = getPlayerName(portal.options.details.captured.capturingPlayerId);
            if (nick.toLowerCase() === nickToFind){
                portalSet[portal.options.guid] = true;            
                var latlng = [portal.options.details.locationE6.latE6/1E6, portal.options.details.locationE6.lngE6/1E6].join();
                var guid = portal.options.guid;
                var zoomPortal = 'window.zoomToAndShowPortal(\''+guid+'\', ['+latlng+']);return false';
                var perma = '/intel?latE6='+portal.options.details.locationE6.latE6+'&lngE6='+portal.options.details.locationE6.lngE6+'&z=17&pguid='+guid;
                var a = $('<a>',{
                    "class": 'help',
                    text: portal.options.details.portalV2.descriptiveText.TITLE,
                    title: portal.options.details.portalV2.descriptiveText.ADDRESS,
                    href: perma,
                    onClick: zoomPortal
                })[0].outerHTML;
                portalCounter += 1;
                var portalLevel = getPortalLevel(portal.options.details);
                var now = new Date().getTime();
            	var elapsed = now-portal.options.details.captured.capturedTime;
                var portalLife = parseInt(elapsed/86400000);
                s += a + " - L" + portalLevel + " | " + portalLife + "D \n";
            }
        });
        if (s) {
            // Showing the playername as a "fake" link to avoid the auto-mouseover effect on the first portal
            fakeLinkPlayer = '<a href="#" onClick="return false;">' + playername + '</a>'
            s = fakeLinkPlayer + " owns " + portalCounter + " portals:\n\n" + s;  
        } else {
            s = playername + " doesn't own portal in this range\n";  
        }
        alert(s);
    }
    
    var setup = function() {
        var content = '<input id="portalOwner" placeholder="Type player name to find portals..." type="text">';
        $('#sidebar').append(content);
        $('#toolbox').append('  <a onclick=$("#portalOwner").focus() title="Find all portals owned by a player">Portal Owner</a>');
        $("#portalOwner").keypress(function(e) {
            if((e.keyCode ? e.keyCode : e.which) !== 13) return;
            var data = $(this).val();
            window.plugin.portalOwner.findOwner(data);
        });
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
