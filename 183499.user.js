// ==UserScript==
// @id             iitc-plugin-highlight-guardian
// @name           IITC plugin: Highlight Guardian
// @category       Highlighter
// @version        0.0.3
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      
// @downloadURL    
// @description    Highlight portals in red, orange, yellow with capturedTime older than 90, 60, 30 days
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==

function wrapper() {
    // ensure plugin framework is there, even if iitc is not yet loaded
    if (typeof window.plugin !== 'function') window.plugin = function () {};



    // PLUGIN START ////////////////////////////////////////////////////////

    // use own namespace for plugin
    window.plugin.guardianHighlighter = function () {};

    window.plugin.guardianHighlighter.highlightGuardian = function (data) {
        var d = data.portal.options.details;
        if (d.captured!=undefined && d.captured.capturedTime!=undefined)
        {
            var now = new Date().getTime();
            var elapsed = now-parseInt(d.captured.capturedTime);
            //console.log('guardianHighlighter, '+d.portalV2.descriptiveText.TITLE+', '+elapsed+', '+(elapsed/86400000) );
            if (elapsed > 86400000*90)
            {
                var color = 'red';
                var params = {
                    fillOpacity: 1,
                    fillColor: color
                };
                data.portal.setStyle(params);
            }
            else if (elapsed > 86400000*60)
            {
                var color = 'orange';
                var params = {
                    fillOpacity: 1,
                    fillColor: color
                };
                data.portal.setStyle(params);
            }
            else if (elapsed > 86400000*30)
            {
                var color = 'yellow';
                var params = {
                    fillOpacity: 1,
                    fillColor: color
                };
                data.portal.setStyle(params);
            }
        }
    }

    var setup = function () {
        window.addPortalHighlighter('Guardian', window.plugin.guardianHighlighter.highlightGuardian);
    }

    // PLUGIN END //////////////////////////////////////////////////////////


    if (window.iitcLoaded && typeof setup === 'function') {
        setup();
    } else {
        if (window.bootPlugins)
            window.bootPlugins.push(setup);
        else
            window.bootPlugins = [setup];
    }
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + wrapper + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);
