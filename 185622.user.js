// ==UserScript==
// @name        Ingress Intel Map - Cymothoa Exigua Mod
// @version     0.2014.0129.0210
// @namespace   FB970CAD-EC58-4624-85CE-C43235B98421
// @updateURL   http://userscripts.org/scripts/source/185622.meta.js
// @downloadURL https://userscripts.org/scripts/source/185622.user.js
// @match       https://www.ingress.com/intel*
// @match       http://www.ingress.com/intel*
// @grant       none
// ==/UserScript==

// http://docs.closure-library.googlecode.com/git/closure_goog_i18n_datetimeformat.js.source.html
var dateTimeFormat, longTimeFormat, shortTimeFormat, shortDateFormat;
switch(window.navigator.userLanguage || window.navigator.language) {
    case "ru":
        dateTimeFormat = new goog.i18n.DateTimeFormat("dd.MM.yyyy HH:mm");
        longTimeFormat = new goog.i18n.DateTimeFormat("HH:mm:ss");
        shortTimeFormat = new goog.i18n.DateTimeFormat("HH:mm");
        shortDateFormat = new goog.i18n.DateTimeFormat("d MMM");
        break;
    default:
        dateTimeFormat = new goog.i18n.DateTimeFormat(goog.i18n.DateTimeFormat.Format.SHORT_DATETIME);
        longTimeFormat = new goog.i18n.DateTimeFormat(goog.i18n.DateTimeFormat.Format.LONG_TIME);
        shortTimeFormat = new goog.i18n.DateTimeFormat(goog.i18n.DateTimeFormat.Format.SHORT_TIME);
        shortDateFormat = new goog.i18n.DateTimeFormat("MMM d");
        break;
}

var style = document.createElement("style");
style.appendChild(document.createTextNode("")); // WebKit hack
document.head.appendChild(style);

// compact dashboard: common
style.sheet.addRule('html, body', 'overflow: hidden;');
style.sheet.addRule('#header > div', 'display: none;');
style.sheet.addRule('#header > .separator', 'display: table; top: 12px; margin-left: -7px;');
style.sheet.addRule('#game_stats', 'margin-left: 12px;');
style.sheet.addRule('#dashboard_container', 'top: 42px; left: 5px; right: 5px; bottom: 40px;');
style.sheet.addRule('#comm', 'left: -1px; bottom: -34px;');
style.sheet.addRule('#filters_container', 'bottom: -5px;');
style.sheet.addRule('#portal_filter_header', 'bottom: -32px; z-index: 1;');
style.sheet.addRule('#footer', 'bottom: -40px;');

// compact dashboard: link
style.sheet.addRule('#header_maplink.show_box + .header_box', 'display: block;');
style.sheet.addRule('#header_maplink_box', 'top: 44px; right: 7px;');
style.sheet.addRule('#header_maplink > .header_icon_text', 'margin-top: -9px;');

// link window
style.sheet.addRule('#maplink_form input[type=text]', 'display: block;');
style.sheet.addRule('#maplink_form label', 'display: block;');
style.sheet.addRule('#maplink_form a', 'color: #59fbea; display: block; float: right;');

// portal info: basic
style.sheet.addRule('#portal_level, #portal_owner', 'float: left;');
style.sheet.addRule('#portal_capture, #portal_edges_count, #portal_capture_status', 'clear: both;');
style.sheet.addRule('#portal_level, #portal_capture_label, #portal_edges_label', 'color: #ebbc4a; width: 68px; margin-right: 0;');
style.sheet.addRule('#portal_capture_label, #portal_capture_value, #portal_edges_label, #portal_edges_value', 'display: inline-block;');
style.sheet.addRule('#portal_discovery_label, #portal_capture_details', 'margin: 0; padding: 0; display: inline;');

// portal info: deploy details (resonators, mods)
style.sheet.addRule('#portal_tab_group_decorator', 'margin: 5px 0;'); // middle line
style.sheet.addRule('#portal_tab_group_decorator > div', 'display: none;'); // tabs
style.sheet.addRule('#resonators_left, #resonators_center, #resonators_right, #resonators_mods_separator, #mods_right', 'display: inline-block; vertical-align: top; margin: 0; padding: 0;');
style.sheet.addRule('#portal_guts .resonator, #portal_guts .mod_short', 'display: block; margin: 0; padding: 1px 0; width: 100%; height: 22px;');
style.sheet.addRule('#portal_guts .resonator_owner, #portal_guts .resonator_level, #portal_guts .resonator_health, #portal_guts .mod_short_name, #portal_guts .mod_short_owner', 'display: inline-block; vertical-align: middle; margin: 0; padding: 0; line-height: 18px;');
style.sheet.addRule('#portal_guts .resonator > span', 'vertical-align: middle;'); // loading...
style.sheet.addRule('#resonators_health', 'bottom: 9px;'); // portal health bar

// http://caniuse.com/#feat=calc
// 100% = (agent+40) + 35 + (40+agent) + 5 + (30+agent) ==> agent = (100% - 150px)/3
style.sheet.addRule('#portal_guts', 'margin: 0 5px;');
style.sheet.addRule('#resonators_left', 'width: calc((100% - 150px)/3 + 40px);');
style.sheet.addRule('#resonators_center', 'width: 35px;');
style.sheet.addRule('#resonators_right', 'width: calc((100% - 150px)/3 + 40px);');
style.sheet.addRule('#resonators_mods_separator', 'width: 5px;');
style.sheet.addRule('#mods_right', 'width: calc((100% - 150px)/3 + 30px);');

style.sheet.addRule('#portal_guts .resonator_level', 'width: 15px; text-align: center; margin: 0 5px;');
style.sheet.addRule('#portal_guts .resonator_owner', 'width: calc(100% - 40px);');
style.sheet.addRule('#portal_guts .mod_short_name', 'width: 23px; text-align: center; margin-right: 5px; border: 1px solid #ebbc4a;'); // 30 = 1 + 23 + 1 + 5
style.sheet.addRule('#portal_guts .mod_short_owner', 'width: calc(100% - 30px);');

style.sheet.addRule('#portal_guts .resonator_owner, #portal_guts .mod_short_owner', 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;');
style.sheet.addRule('#portal_guts .mod_short_name', 'color: #ebbc4a; background-color: #000;');
style.sheet.addRule('.ENLIGHTENED #portal_guts .mod_short_name', 'border-color: rgba(40, 244, 40, 0.6);');
style.sheet.addRule('.RESISTANCE  #portal_guts .mod_short_name', 'border-color: rgba(0, 194, 255, 0.6);');

style.sheet.addRule('#portal_guts .mod_short.COMMON .mod_short_name', 'color: #28F428;');
style.sheet.addRule('#portal_guts .mod_short.RARE .mod_short_name', 'color: #9933FF;');
style.sheet.addRule('#portal_guts .mod_short.VERY_RARE .mod_short_name', 'color: #FF00FF;');

// player tracker
style.sheet.addRule('#player_tracker', 'position: absolute; left: 10px; top: 45px;');
style.sheet.addRule('#player_tracker .player_tracker_item', 'color: #ccc; background-color: rgba(63, 57, 31, 0.9); width: 300px; border: 1px solid #666; margin-top:10px; padding: 4px;');
style.sheet.addRule('#player_tracker .player_tracker_item > div', '/*max-height: calc(15px * 3);*/ font-size: 13px; line-height: 15px; overflow: hidden; text-overflow: ellipsis;');
style.sheet.addRule('.player_tracker_link, .player_tracker_info', 'cursor: pointer;');
style.sheet.addRule('.player_tracker_link', 'text-decoration: underline;');
//style.sheet.addRule('#player_tracker .player_tracker_address', 'color: #999;');

// compact dashboard: move link button
var linkButton = document.getElementById("header_maplink");
var geotools = document.getElementById("geotools");
if(linkButton && geotools) {
    linkButton.style.float = "none";
    linkButton.style.position = "absolute";
    linkButton.style.zIndex = 1;
    linkButton.style.top = "-3px";
    linkButton.style.right = (geotools.offsetWidth + 5) + "px";
    linkButton.style.display = "block";
}

var playerTracker = document.createElement("DIV");
playerTracker.id = "player_tracker";
document.getElementById("dashboard_container").insertBefore(playerTracker, document.getElementById("map_canvas").nextElementSibling);

var maplink_box = document.getElementById("header_maplink_box");
if(maplink_box && document.getElementById("maplink_form") && document.getElementById("maplink")) {
    maplink_box.innerHTML = '<form onSubmit="return false;" id="maplink_form">'
    + '<label for="maplink_portal">Portal</label>'
    + '<input type="text" id="maplink_portal" value="" onClick="this.select()">'
    + '<label for="maplink">Ingress Intel Map</label>'
    + '<input type="text" id="maplink" value="" onClick="this.select()">'
    + '<a id="maplink_open_google" target="_blank">open</a>'
    + '<label for="maplink_google">Google Maps</label>'
    + '<input type="text" id="maplink_google" value="" onClick="this.select()">'
    + '<a id="maplink_open_yandex" target="_blank">open</a>'
    + '<label for="maplink_yandex">Yandex Maps</label>'
    + '<input type="text" id="maplink_yandex" value="" onClick="this.select()">'
    + '</form>';
}

var getMaplinkLegacy = nemesis.dashboard.maputils.getMaplink;
goog.exportSymbol("getmaplink", nemesis.dashboard.maputils.getMaplink = function() {
    // [Google Maps] http://moz.com/ugc/everything-you-never-wanted-to-know-about-google-maps-parameters
    // [Yandex Maps] http://api.yandex.ru/maps/doc/staticapi/1.x/dg/concepts/input_params.xml
    getMaplinkLegacy();
    if(document.getElementById("maplink_portal")) {
        var mapCenter = nemesis.dashboard.maputils.map.getCenter();
        var mapZoom = nemesis.dashboard.zoomlevel.currentZoomLevel;
        
        var google = "http://maps.google.com/maps?ll=" + mapCenter.toUrlValue() + "&spn=0.1,0.1&z=" + mapZoom;
        var yandex = "http://maps.yandex.ru/?ll=" + mapCenter.nb + "," + mapCenter.mb + "&spn=0.1,0.1&z=" + mapZoom;
        
        var portal = nemesis.dashboard.render.PortalInfoOverlay.getCurrentPortal();
        if(portal) {
            google += "&q=" + portal.lat + "," + portal.lng;
            yandex += "&pt=" + portal.lng + "," + portal.lat;
        }
        
        document.getElementById("maplink_portal").value = portal ? portal.lat + "," + portal.lng : "";
        
        document.getElementById("maplink_google").value = google;
        document.getElementById("maplink_yandex").value = yandex;
        
        document.getElementById("maplink_open_google").href = google;
        document.getElementById("maplink_open_yandex").href = yandex;
    }
});

// new function
nemesis.dashboard.soy.portalinfooverlay.portalEdges = function(a, b) {
    var c = b || new soy.StringBuilder;
    var inc = 0, out = 0;
    goog.object.forEach(a.portal.spy.edges, function(e) { e.isOrigin ? out++ : inc++ });
    var total = inc + out;
    c.append(total > 0 ? inc + " inc, " + out + " out" : total);
    return b ? "" : c.toString()
};

// override
nemesis.dashboard.soy.portalinfooverlay.basicMetadata_ = function(a, b) {
    var c = b || new soy.StringBuilder;
    c.append('<div class="portal_details_row">');
    c.append('<div id="portal_image_container"><div id="portal_image">', a.portal.image ? '<img style="max-width:100%; max-height:100%; margin:auto; display:block" src="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(a.portal.image)) + '">' : "", "</div></div>");
    c.append('<div id="portal_metadata">');
    nemesis.dashboard.soy.portalinfooverlay.portalMetadata(a, c);
    c.append("</div></div>"); // portal_metadata, portal_details_row
    return b ? "" : c.toString()
};

// new function
nemesis.dashboard.soy.portalinfooverlay.portalMetadata = function(a, b) {
    var c = b || new soy.StringBuilder;
    
    c.append(a.portal.level ? '<div id="portal_level">Level ' + soy.$$escapeHtml(a.portal.level) + "</div>" : "");
    
    if(a.portal.isCaptured) {
        c.append('<div id="portal_owner">', a.portal.capturingPlayer ? '<span title="' + soy.$$escapeHtmlAttribute(a.portal.capturingPlayer) + '">' + soy.$$escapeHtml(a.portal.capturingPlayer) + "</span>" : "loading...", "</div>");
        
        c.append('<div id="portal_capture"><div id="portal_capture_label">Discovery:</div><div id="portal_capture_value">');
        c.append(a.portal.spy ? soy.$$escapeHtml(dateTimeFormat.format(a.portal.spy.capturedTime)) : "loading...");
        c.append("</div></div>"); // portal_capture_value, portal_capture
        
        c.append('<div id="portal_edges_count"><div id="portal_edges_label">Links:</div><div id="portal_edges_value">');
        a.portal.spy ? nemesis.dashboard.soy.portalinfooverlay.portalEdges(a, c) : c.append("loading...");
        c.append("</div></div>"); // portal_edges_value, portal_edges_count
    }
    
    c.append('<div id="portal_capture_status">');
    c.append('<div id="portal_discovery_label"></div><div id="portal_capture_details"></div>');
    var artifactFragmentNumbers = a.artifactFragmentNumbers || a.portal.getArtifactFragmentNums().join(", ");
    c.append(artifactFragmentNumbers ? '<div class="portal_fragments">Shards: #' + soy.$$escapeHtml(artifactFragmentNumbers) + "</div>" : "");
    c.append("</div>"); // portal_capture_status
    
    return b ? "" : c.toString()
};

// override (add mods), merged with `nemesis.dashboard.soy.portalinfooverlay.resonators_`
nemesis.dashboard.soy.portalinfooverlay.deployDetails = function(a, b) {
    var shortName = {
        "Force Amp": "FA",
        "Heat Sink": "HS",
        "Link Amp": "LA",
        "Multi-hack": "MH",
        "Portal Shield": "PS",
        "Turret": "TU",
    };
    
    var c = b || new soy.StringBuilder;
    c.append('<div id="portal_guts">');
    
    var d, i = 0;
    
    c.append('<div id="resonators_left">');
    for(d = 0; d < 4; ++d) {
        var resData, p = {
            isRight: 0,
            dataComplete: a.portal.linkedResonators.length > 0,
        };
        if(resData = a.portal.spy ? a.portal.spy.resonators[d] : null) {
            var res = a.portal.linkedResonators[i++];
            p.isDeployed = 1;
            p.energyFactor = resData.energyTotal / res.getEnergyCapacity();
            p = soy.$$augmentData(res, p);
        }
        nemesis.dashboard.soy.portalinfooverlay.resonator_(p, c);
    }
    
    c.append('</div><div id="resonators_center">');
    nemesis.dashboard.soy.portalinfooverlay.resonatorsCenterPiece_(a.portal, c);
    
    c.append('</div><div id="resonators_right">');
    for(d = 4; d < 8; ++d) {
        var resData, p = {
            isRight: 1,
            dataComplete: a.portal.linkedResonators.length > 0,
        };
        if(resData = a.portal.spy ? a.portal.spy.resonators[d] : null) {
            var res = a.portal.linkedResonators[i++];
            p.isDeployed = 1;
            p.energyFactor = resData.energyTotal / res.getEnergyCapacity();
            p = soy.$$augmentData(res, p);
        }
        nemesis.dashboard.soy.portalinfooverlay.resonator_(p, c);
    }
    
    c.append('</div><div id="resonators_mods_separator">');
    
    c.append('</div><div id="mods_right">');
    for(d = i = 0; d < 4; ++d) {
        var md = a.portal.spy ? a.portal.spy.mods[d] : null;
        var m = md ? a.portal.linkedMods[i++] : {};
        c.append('<div class="mod_short ', (md && md.rarity) || "", '">');
        
        if(m.name)
            c.append('<div class="mod_short_name" title="', m.name, '">', shortName[m.name] || "?", "</div>");
        else
            c.append('<div class="mod_short_name">&nbsp;</div>');
        
        if(m.installer)
            c.append('<div class="mod_short_owner" title="', m.installer, '">', m.installer, "</div>");
        else
            c.append('<div class="mod_short_owner">', a.portal.hasDetails() ? "&nbsp;" : "loading...", "</div>");
        
        c.append("</div>");
    }
    c.append("</div>"); // mods_right
    
    c.append("</div>"); // portal_guts
    return b ? "" : c.toString()
};

// override
nemesis.dashboard.render.PortalInfoOverlay.prototype.updatePortalDetails_ = function(a) {
    if(this.isCurrentInfoWindow_()) {
        if(a && (this.portal_ = a, !a.hasDetails())) {
            return;
        }
        if(a = document.getElementById("deploy_details")) {
            soy.renderElement(a, nemesis.dashboard.soy.portalinfooverlay.deployDetails, {portal:this.portal_});
        }
        if(a = document.getElementById("portal_metadata")) {
            soy.renderElement(a, nemesis.dashboard.soy.portalinfooverlay.portalMetadata, {portal:this.portal_});
        }
        nemesis.dashboard.render.PortalInfoOverlay.maybeRepositionWindow()
    }
};

// patch: add title
nemesis.dashboard.soy.portalinfooverlay.resonatorHealth_ = function(a, b) {
    var c = b || new soy.StringBuilder;
    var title = a.energyFactor ? ' title="' + (100 * a.energyFactor).toFixed(1) + '%"' : "";
    c.append('<div class="resonator_health"><div class="resonator_health_slot"' + title + '>', a.level ? "<div " + (a.health ? 'style="height: ' + soy.$$filterCssValue(a.health) + 'px;"' : "") + 'class="resonator_health_indicator resonator_level_' + soy.$$escapeHtmlAttribute(a.level) + '"></div>' : "", "</div></div>");
    return b ? "" : c.toString()
};

// patch: "Level " -> "L"
nemesis.dashboard.soy.portalinfooverlay.resonatorLevel_ = function(a, b) {
    var c = b || new soy.StringBuilder;
    c.append('<div class="resonator_level">', a.level ? "L" + soy.$$escapeHtml(a.level) : "", "</div>");
    return b ? "" : c.toString()
};

var updateDetailsLegacy = nemesis.dashboard.data.Portal.prototype.updateDetails;
nemesis.dashboard.data.Portal.prototype.updateDetails = function(a) {
    updateDetailsLegacy.call(this, a);
    this.spy = {};
    this.spy.info = a.portalV2.descriptiveText || {};
    if(a.captured) {
        this.spy.capturedTime = new Date(parseInt(a.captured.capturedTime, 10));
        this.spy.resonators = a.resonatorArray.resonators || [];
        this.spy.mods = a.portalV2.linkedModArray || [];
        this.spy.edges = a.portalV2.linkedEdges || [];
    }
};

var formatTimestamp = function(ts, now) {
    var threshold = 24*60*60*1000; // 1 day (in milliseconds)
    return ((now - ts >= threshold) ? shortDateFormat : shortTimeFormat).format(new Date(ts));
};

// nemesis.dashboard.render.PlextRender.LoadingStatus = {NONE:0, LOADING:1, ERROR:2};
// nemesis.dashboard.data.Plext.Type = {SYSTEM_BROADCAST:0, SYSTEM_NARROWCAST:1, PLAYER_GENERATED:2};
// nemesis.dashboard.data.PlextMarkup.Type = {TEXT:0, FACTION:1, PLAYER:2, SENDER:3, PORTAL:4, SECURE:5, AT_PLAYER:6};
var setLoadingStatusLegacy = nemesis.dashboard.PlextController.prototype.setLoadingStatus_;
nemesis.dashboard.PlextController.prototype.setLoadingStatus_ = function(a, b, c) {
    setLoadingStatusLegacy.call(this, a, b, c);
    
    if(playerTracker.currentTab != a) {
        if(playerTracker.currentTab)
            playerTracker.innerHTML = "";
        playerTracker.currentTab = a;
    }
    
    if(c == nemesis.dashboard.render.PlextRender.LoadingStatus.LOADING)
        return;
    
    var data = [];
    goog.object.forEach(this.getCurrentFeed_().getPlexts(), function(p) {
        var playerPos, portalPos;
        if(p.type == nemesis.dashboard.data.Plext.Type.PLAYER_GENERATE)
            return;
        if(-1 == (playerPos = goog.array.findIndex(p.markups, function(m) { return m.type === nemesis.dashboard.data.PlextMarkup.Type.PLAYER })))
            return;
        if(-1 == (portalPos = goog.array.findIndex(p.markups, function(m) { return m.type === nemesis.dashboard.data.PlextMarkup.Type.PORTAL })))
            return;
        data.push({
            plext: p,
            player: p.markups[playerPos].plain,
            team: p.markups[playerPos].team,
            timestamp: p.timestampMs,
            barrier: p.timestampMs,
            playerPos: playerPos,
            portalPos: portalPos,
        });
    });
    
    data.sort(function(x, y) {
        if(x.player > y.player) return 1;
        if(x.player < y.player) return -1;
        return y.timestamp - x.timestamp;
    });
    
    var threshold = 1*60*60*1000; // 1 hour (in milliseconds)
    var item = {};
    var result = [];
    goog.object.forEach(data, function(x) {
        if((item.player != x.player) || (item.barrier - x.timestamp >= threshold))
            result.push(item = x);
        else
            item.barrier = x.timestamp;
    });
    
    result.sort(function(x, y) { return y.timestamp - x.timestamp });
    //console.log(result);
    
    var now = new Date().valueOf();
    var sb = new soy.StringBuilder;
    var i, x;
    var maxCount = 7;
    var n = result.length > maxCount ? maxCount - 1 : result.length;
    
    for(i=0; i<n; ++i) {
        x = result[i];
        sb.append('<div class="player_tracker_item"><div>');
        sb.append('<span class="player_tracker_time">', formatTimestamp(x.timestamp, now), "</span>");
        sb.append(" ");
        sb.append('<span class="player_tracker_actor ', x.team.css, '">', soy.$$escapeHtml(x.player), "</span>");
        goog.object.forEach(x.plext.markups, function(v, k) {
            if(k == 0) {
                if(x.playerPos == 0)
                    return;
                sb.append(" ");
            }
            switch(v.type) {
                case nemesis.dashboard.data.PlextMarkup.Type.PORTAL:
                    sb.append('<span class="player_tracker_link"');
                    sb.append(' onclick="nemesis.dashboard.render.highlightPortalAtLatLng(', v.lat, ",", v.lng, ')"');
                    sb.append(">", soy.$$escapeHtml(v.name), "</span>");
                    if(v.address) {
                        sb.append(" ");
                        sb.append('<span class="player_tracker_address">(', soy.$$escapeHtml(v.address), ")</span>");
                    }
                    break;
                default:
                    sb.append(soy.$$escapeHtml(v.plain));
            }
        });
        sb.append("</div></div>");
    };
    
    maxCount = 15;
    n = Math.min(result.length, i + maxCount);
    
    if(i < n) {
        var prevTime, currTime;
        sb.append('<div class="player_tracker_item"><div>');
        for(; i < n; ++i) {
            x = result[i];
            currTime = formatTimestamp(x.timestamp, now);
            if(prevTime != currTime) {
                if(prevTime)
                    sb.append(" ");
                sb.append('<span class="player_tracker_time">', currTime, "</span>");
                sb.append(" ");
                prevTime = currTime;
            } else {
                sb.append(", ");
            }
            var title = "";
            var portal = x.plext.markups[x.portalPos];
            for(var j=0; j<x.plext.markups.length; ++j)
                title += x.plext.markups[j].plain;
            sb.append('<span class="player_tracker_actor ', x.team.css, '">', soy.$$escapeHtml(x.player), "</span>");
            sb.append('<span class="player_tracker_info"');
            sb.append(' title="', soy.$$escapeHtmlAttribute(title), '"');
            sb.append(' onclick="nemesis.dashboard.render.highlightPortalAtLatLng(', portal.lat, ",", portal.lng, ')"');
            sb.append(">♦</span>");
        }
        sb.append("</div></div>");
    }
    
    playerTracker.innerHTML = sb.toString();
};

// patch: add title
nemesis.dashboard.soy.plextrender.plext_date_ = function(a, b) {
    var c = b || new soy.StringBuilder;
    c.append("<\!-- ", soy.$$escapeHtmlRcdata(a.isNudge), " --\>");
    if(a.isNudge) {
        c.append('<div class="pl_nudge_timestamp"><div class="pl_timestamp_container"><div class="pl_nudge_date" title="' + longTimeFormat.format(new Date(a.timestampMs)) + '">' + soy.$$escapeHtml(a.timestamp) + '</div><div class="pl_nudge_pointy_spacer"></div></div></div>');
    } else {
        c.append('<div class="pl_timestamp"><div class="pl_timestamp_container"><div class="pl_timestamp_date" title="' + longTimeFormat.format(new Date(a.timestampMs)) + '">' + soy.$$escapeHtml(a.timestamp) + '</div><div class="pl_timestamp_spacer"></div></div></div>');
    }
    return b ? "" : c.toString()
};