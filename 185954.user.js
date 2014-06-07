// ==UserScript==
// @name        Ingress Intel Map 
// @version     0.2013
// @namespace   FB970CAD-EC58-4624-85CE-C43235B98421
// @include       https://www.ingress.com/intel*
// @include       http://www.ingress.com/intel*
// @grant       none
// ==/UserScript==


if(typeof document.createStyleSheet === 'undefined') {
    document.createStyleSheet = (function() {
        function createStyleSheet(href) {
            if(typeof href !== 'undefined') {
                var element = document.createElement('link');
                element.type = 'text/css';
                element.rel = 'stylesheet';
                element.href = href;
            }
            else {
                var element = document.createElement('style');
                element.type = 'text/css';
            }

            document.getElementsByTagName('head')[0].appendChild(element);
            var sheet = document.styleSheets[document.styleSheets.length - 1];

            if(typeof sheet.addRule === 'undefined')
                sheet.addRule = addRule;

            if(typeof sheet.removeRule === 'undefined')
                sheet.removeRule = sheet.deleteRule;

            return sheet;
        }

        function addRule(selectorText, cssText, index) {
            if(typeof index === 'undefined')
                index = this.cssRules.length;

            this.insertRule(selectorText + ' {' + cssText + '}', index);
        }

        return createStyleSheet;
    })();
}


var sheet = document.createStyleSheet();

sheet.addRule('html, body', 'overflow: hidden;');
sheet.addRule('#header > div', 'display: none;');
sheet.addRule('#header > .separator', 'display: table; top: 12px; margin-left: -7px;');
sheet.addRule('#game_stats', 'margin-left: 12px;');
sheet.addRule('#dashboard_container', 'top: 42px; left: 5px; right: 5px; bottom: 40px;');
sheet.addRule('#comm', 'left: -1px; bottom: -34px;');
sheet.addRule('#filters_container', 'bottom: -5px;');
sheet.addRule('#portal_filter_header', 'bottom: -32px; z-index: 1;');
sheet.addRule('#footer', 'bottom: -40px;');
sheet.addRule('#header_maplink.show_box + .header_box', 'display: block;');
sheet.addRule('#header_maplink_box', 'top: 44px; right: 7px;');
sheet.addRule('#header_maplink > .header_icon_text', 'margin-top: -9px;');
sheet.addRule('#maplink_form input[type=text]', 'display: block;');
sheet.addRule('#maplink_form label', 'display: block;');
sheet.addRule('#maplink_form a', 'color: #59fbea; display: block; float: right;');
sheet.addRule('#portal_edges_label', 'color: #ebbc4a; margin-right: 4px;');
sheet.addRule('#portal_ap', 'margin-left: 22px;');
sheet.addRule('#portal_ap_label', 'color: #ebbc4a; margin-right: 4px;');
sheet.addRule('#resonators_left, #resonators_center, #resonators_right, #resonators_mods_separator, #mods_right', 'display: inline-block; vertical-align: top; margin: 0; padding: 0;');
sheet.addRule('#portal_guts .resonator, #portal_guts .mod_short', 'display: block; margin: 0; padding: 1px 0; width: 100%; height: 22px;');
sheet.addRule('#portal_guts .resonator_owner, #portal_guts .resonator_level, #portal_guts .resonator_health, #portal_guts .mod_short_name, #portal_guts .mod_short_owner', 'display: inline-block; vertical-align: middle; margin: 0; padding: 0; line-height: 18px;');
sheet.addRule('#portal_guts .resonator > span', 'vertical-align: middle;');
sheet.addRule('#portal_guts', 'margin: 0 5px;');
sheet.addRule('#resonators_left', 'width: calc((100% - 150px)/3 + 40px);');
sheet.addRule('#resonators_center', 'width: 35px; vertical-align: bottom;');
sheet.addRule('#resonators_right', 'width: calc((100% - 150px)/3 + 40px);');
sheet.addRule('#resonators_mods_separator', 'width: 5px;');
sheet.addRule('#mods_right', 'width: calc((100% - 150px)/3 + 30px);');
sheet.addRule('#portal_guts .resonator_level', 'width: 15px; text-align: center; margin: 0 5px;');
sheet.addRule('#portal_guts .resonator_owner', 'width: calc(100% - 40px);');
sheet.addRule('#portal_guts .mod_short_name', 'width: 23px; text-align: center; margin-right: 5px; border: 1px solid #ebbc4a;');
sheet.addRule('#portal_guts .mod_short_owner', 'width: calc(100% - 30px);');
sheet.addRule('#portal_guts .resonator_owner, #portal_guts .mod_short_owner', 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;');
sheet.addRule('#portal_guts .mod_short_name', 'color: #ebbc4a; background-color: #000;');
sheet.addRule('.ENLIGHTENED #portal_guts .mod_short_name', 'border-color: rgba(40, 244, 40, 0.6);');
sheet.addRule('.RESISTANCE  #portal_guts .mod_short_name', 'border-color: rgba(0, 194, 255, 0.6);');
sheet.addRule('#portal_guts .mod_short.Common .mod_short_name', 'color: #28F428;');
sheet.addRule('#portal_guts .mod_short.Rare .mod_short_name', 'color: #9933FF;');
sheet.addRule('#portal_guts .mod_short.Very.rare .mod_short_name', 'color: #FF00FF;');


var linkButton = document.getElementById('header_maplink');
var geotools = document.getElementById('geotools');
if (linkButton && geotools) {
    linkButton.style.float = 'none';
    linkButton.style.position = 'absolute';
    linkButton.style.zIndex = 1;
    linkButton.style.top = '-3px';
    linkButton.style.right = geotools.offsetWidth + 5 + 'px';
    linkButton.style.display = 'block'
}
var maplink_box = document.getElementById('header_maplink_box');
if (maplink_box && document.getElementById('maplink_form') && document.getElementById('maplink')) {
    maplink_box.innerHTML = '<form onSubmit="return false;" id="maplink_form">' + '<label for="maplink_portal">Portal</label>' + '<input type="text" id="maplink_portal" value="" onClick="this.select()">' + '<label for="maplink">Ingress Intel Map</label>' + '<input type="text" id="maplink" value="" onClick="this.select()">' + '<a id="maplink_open_google" target="_blank">open</a>' + '<label for="maplink_google">Google Maps</label>' + '<input type="text" id="maplink_google" value="" onClick="this.select()">' + '<a id="maplink_open_yandex" target="_blank">open</a>' + '<label for="maplink_yandex">Yandex Maps</label>' + '<input type="text" id="maplink_yandex" value="" onClick="this.select()">' + '</form>'
}
goog.exportSymbol('getmaplink', nemesis.dashboard.maputils.getMaplink = function () {
    if (document.getElementById('maplink_portal')) {
        var mapCenter = nemesis.dashboard.maputils.map.getCenter();
        var mapZoom = nemesis.dashboard.zoomlevel.currentZoomLevel;
        var ingress = window.location.protocol + '//' + window.location.hostname + '/intel?ll=' + mapCenter.toUrlValue() + '&z=' + mapZoom;
        var google = 'http://maps.google.com/maps?ll=' + mapCenter.toUrlValue() + '&spn=0.1,0.1&z=' + mapZoom;
        var yandex = 'http://maps.yandex.ru/?ll=' + mapCenter.nb + ',' + mapCenter.mb + '&spn=0.1,0.1&z=' + mapZoom;
        var portal = nemesis.dashboard.render.PortalInfoOverlay.getCurrentPortal();
        if (portal) {
            ingress += '&pll=' + portal.lat + ',' + portal.lng;
            google += '&q=' + portal.lat + ',' + portal.lng;
            yandex += '&pt=' + portal.lng + ',' + portal.lat
        }
        document.getElementById('maplink_portal').value = portal ? mapCenter.toUrlValue() : '';
        document.getElementById('maplink').value = ingress;
        document.getElementById('maplink_google').value = google;
        document.getElementById('maplink_yandex').value = yandex;
        document.getElementById('maplink_open_google').href = google;
        document.getElementById('maplink_open_yandex').href = yandex
    }
});

nemesis.dashboard.soy.portalinfooverlay.portalEdgesBlock_ = function (a, b) {
    if (!a.portal.isCaptured)
        return '';
    
    var c = b || new soy.StringBuilder;
    var dm = nemesis.dashboard.DataManager.getInstance();
    var er = nemesis.dashboard.render.EdgeRender.getInstance();

    if (!dm.isLoadingGameEntities()) {
        var inc = 0, out = 0;
        goog.object.forEach(er.entities_, function (e) {
            if (e.dest_.guid === a.portal.guid)
                inc++;
            if (e.origin_.guid === a.portal.guid)
                out++
        });  
        total_links = inc + out;
    } else
    {
        total_links = "N/A";
    }

    c.append('<div id="portal_edges_count">');
    c.append('<span id="portal_edges_label">Links:</span>');
    c.append('<span id="portal_edges_value">');
    c.append(total_links > 0 ? inc + ' inc, ' + out + ' out' : total_links)
    c.append('</span>');
    c.append('</div>');
    
    return b ? '' : c.toString()
};
nemesis.dashboard.soy.portalinfooverlay.basicMetadata_ = function (a, b) {
    var c = b || new soy.StringBuilder;
    c.append('<div class="portal_details_row"><div id="portal_image_container"><div id="portal_image">', a.portal.image ? '<img style="max-width:100%; max-height:100%; margin:auto; display:block" src="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(a.portal.image)) + '">' : '', '</div></div><div id="portal_metadata">', a.portal.level ? '<div id="portal_level">Level ' + soy.$$escapeHtml(a.portal.level) + '</div>' : '', nemesis.dashboard.soy.portalinfooverlay.portalEdgesBlock_(a), '<div id="portal_capture_status">');
    a.portal.isCaptured && (c.append('<div id="portal_discovery_label">Discovery:</div><div id="portal_capture_details">'), nemesis.dashboard.soy.portalinfooverlay.captureDetails(a, c), c.append('</div>'));
    c.append(a.artifactFragmentNumbers ? '<div class="portal_fragments">Shards: #' + soy.$$escapeHtml(a.artifactFragmentNumbers) + '</div>' : '', '</div></div></div>');
    return b ? '' : c.toString()
};
nemesis.dashboard.soy.portalinfooverlay.deployDetails = function (a, b) {

    var shortName = {
            'Force Amp': 'FA',
            'Heat Sink': 'HS',
            'Link Amp': 'LA',
            'Multi-hack': 'MH',
            'Portal Shield': 'PS',
            'Turret': 'TU'
        };
    var resonators = a.portal.linkedResonators;
    
    var c = b || new soy.StringBuilder;
    
    var dm = nemesis.dashboard.DataManager.getInstance();
    var er = nemesis.dashboard.render.EdgeRender.getInstance();
    var rr = nemesis.dashboard.render.RegionRender.getInstance();
    
    var total_links = 0;
    var total_fields = 0;
    var total_health = 0;
    var mitigation = 0;

    if (!dm.isLoadingGameEntities()) {
        var inc = 0, out = 0;
        goog.object.forEach(er.entities_, function (e) {
            if (e.dest_.guid === a.portal.guid)
                inc++;
            if (e.origin_.guid === a.portal.guid)
                out++
        });  
        total_links = inc + out;
        
        goog.object.forEach(rr.entities_, function (e){
            
        if(e.points_[0].guid === a.portal.guid ||
            e.points_[1].guid === a.portal.guid ||
            e.points_[2].guid === a.portal.guid)
                total_fields++;    
        });
        
        mitigation = Math.atan( total_links / 2.71828)*4/9;
        console.log(JSON.stringify(a.portal.linkedMods));
        for (m in  a.portal.linkedMods) {
            if(a.portal.linkedMods[m].name == "Portal Shield")
            {
                switch(a.portal.linkedMods[m].rarity){
                    case "Common": mitigation += 0.10; break;
                    case "Rare" : mitigation += 0.20; break;
                    case "Very rare": mitigation +=0.30; break;
                }
            }
        }


        if(mitigation >0.95)
            mitigation = 0.95;

        for(r in resonators){
            total_health+=resonators[r].energy;
        }

        c.append('<div class="portal_details_row"><div id="portal_tab_group_decorator"></div></div>');
        c.append('<div id="portal_guts_container" class="portal_details_row">');

        var total_ap_destroy = resonators.length*75+total_links*187+total_fields*750; //8096
        var total_ap_deploy = 1500+150*2;
        c.append('<div id="portal_ap">');
        c.append('<span id="portal_ap_label">AP:</span>');
        c.append('<span id="portal_ap_value">Destroy: '+total_ap_destroy+' ('+(total_ap_destroy+total_ap_deploy)+')</span><br />');
        c.append('<span id="portal_ap_label">Mitigation: </span>');
        c.append('<span id="portal_ap_value">'+Math.round(mitigation*100)+'%</span><br />');
        c.append('<span id="portal_ap_label">Points: </span>');
        c.append('<span id="portal_ap_value">'+Math.round(total_ap_destroy*197.6/total_health)+'</span> --- ');
        c.append('<span id="portal_ap_value">'+Math.round(total_ap_destroy*mitigation*197.6/total_health)+'</span>');

        c.append('</span></div></div>');
        
    } 
    
    c.append('<div class="portal_details_row"><div id="portal_tab_group_decorator"></div></div>');
    c.append('<div id="portal_guts_container" class="portal_details_row"><div id="portal_guts">');
    c.append('<div id="resonators_left">');
    for (var d = 0; d < 4; d++) {
        d < resonators.length ? nemesis.dashboard.soy.portalinfooverlay.resonator_(soy.$$augmentData(resonators[d], {
            isDeployed: 1,
            dataComplete: resonators.length > 0
        }), c) : nemesis.dashboard.soy.portalinfooverlay.resonator_({
            isRight: 0,
            dataComplete: resonators.length > 0
        }, c)
    }
    c.append('</div><div id="resonators_center">');
    nemesis.dashboard.soy.portalinfooverlay.resonatorsCenterPiece_(a.portal, c);
    c.append('</div><div id="resonators_right">');
    for (d = 4; d < 8; d++) {
        d < resonators.length ? nemesis.dashboard.soy.portalinfooverlay.resonator_(soy.$$augmentData(resonators[d], {
            isRight: 1,
            isDeployed: 1,
            dataComplete: resonators.length > 0
        }), c) : nemesis.dashboard.soy.portalinfooverlay.resonator_({
            isRight: 1,
            dataComplete: resonators.length > 0
        }, c)
    }
    c.append('</div><div id="resonators_mods_separator">');
    c.append('</div><div id="mods_right">');
    for (d = 0; d < 4; d++) {
        var m = a.portal.linkedMods[d] || {};
        c.append('<div class="mod_short ', m.rarity || '', '">');
        if (m.name)
            c.append('<div class="mod_short_name" title="', m.name, '">', shortName[m.name] || '?', '</div>');
        else
            c.append('<div class="mod_short_name">&nbsp;</div>');
        if (m.installer)
            c.append('<div class="mod_short_owner" title="', m.installer, '">', m.installer, '</div>');
        else
            c.append('<div class="mod_short_owner">', a.portal.hasDetails() ? '&nbsp;' : 'loading...', '</div>');
        c.append('</div>')
    }
    c.append('</div>');
    c.append('</div></div>');
  
  
    
    
    return b ? '' : c.toString()
};
nemesis.dashboard.soy.portalinfooverlay.resonatorHealth_ = function (a, b) {
    var c = b || new soy.StringBuilder;
    var title = a.health ? ' title="' + 100 * a.health / 16 + '%"' : '';
    c.append('<div class="resonator_health"><div class="resonator_health_slot"' + title + '>', a.level ? '<div ' + (a.health ? 'style="height: ' + soy.$$filterCssValue(a.health) + 'px;"' : '') + 'class="resonator_health_indicator resonator_level_' + soy.$$escapeHtmlAttribute(a.level) + '"></div>' : '', '</div></div>');
    return b ? '' : c.toString()
};
nemesis.dashboard.soy.portalinfooverlay.resonatorLevel_ = function (a, b) {
    var c = b || new soy.StringBuilder;
    c.append('<div class="resonator_level">', a.level ? 'L' + soy.$$escapeHtml(a.level) : '', '</div>');
    return b ? '' : c.toString()
}