// ==UserScript==
// @id             ingress-21runet-portal-submission
// @name           Ingress 21ru.net: Portal submission
// @version        0.2.20131203.0013
// @namespace      http://ingress.21ru.net/tools/
// @updateURL      http://ingress.21ru.net/tools/ipps.meta.js
// @downloadURL    http://ingress.21ru.net/tools/ipps.user.js
// @description    Portal submission tool for ingress.21ru.net
// @include        http://www.ingress.com/intel*
// @include        https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @grant          none
// ==/UserScript==

function wrapper() {
    if(typeof window.plugin !== 'function') window.plugin = function() {};
    window.plugin.i21n = function() {};
    window.plugin.i21n.submit_portal = function(){
        var p = [];
        $.each(window.portals, function(i, portal){
            //if ( typeof d.portalV2.descriptiveText.DESCRIPTION == 'undefined' ) { d.portalV2.descriptiveText.DESCRIPTION = ''; }
            p.push({
                guid: portal.options.guid,
                title: portal.options.data.title,
                address: '',
                desc: '',
                team: portal.options.data.team,
                level: portal.options.data.level,
                image: portal.options.data.image,
                lngE6: portal.options.data.lngE6,
                latE6: portal.options.data.latE6,
            });
        });
        $.ajax({
            url: 'http://ingress.21ru.net/portal.widget.php?action=submit',
            type: 'POST',
            data:{'d': JSON.stringify(p)},
            dataType: 'json',
            success: function(msg){
                return;
                //if (msg.error) { alert('Ошибка'+msg.text); } else { alert('Спасибо. Было добавлено '+msg.insert+' порталов и обновлено '+msg.update+' порталов.'); }
            }
        });
        alert('Thank You for submitting.');
    }

    var setup = function(){$('#toolbox').append(' <a onclick="window.plugin.i21n.submit_portal()" title="submit all visible portals to ingress.21ru.net">I21N Submit</a>');}

    if(window.iitcLoaded && typeof setup === 'function') {setup();} 
    else {
	if(window.bootPlugins) {window.bootPlugins.push(setup);} 
	else {window.bootPlugins = [setup];}
    }
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);