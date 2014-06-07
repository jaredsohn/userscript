// ==UserScript==
// @name         RunKeeperOSM
// @description  Add support for OpenStreetMap to RunKeeper
// @id           me.4ndrew.RunKeeperOSM
// @version      1.3
// @author       nopox
// @homepageURL  http://userscripts.org/scripts/show/138081
// @supportURL   http://userscripts.org/scripts/discuss/138081
// @updateURL    http://userscripts.org/scripts/source/138081.meta.js
// @include      http://runkeeper.com/user/*/activity/*
// @include      http://runkeeper.com/user/*/route*
// @include      http://runkeeper.com/edit/race*
// @include      http://runkeeper.com/edit/activity*
// @include      http://runkeeper.com/new/race
// @include      http://runkeeper.com/race/*
// @include      http://runkeeper.com/races/racehub/RaceHubRaceFinder.action*
// @match      http://runkeeper.com/user/*/activity/*
// @match      http://runkeeper.com/user/*/route*
// @match      http://runkeeper.com/edit/race*
// @match      http://runkeeper.com/edit/activity*
// @match      http://runkeeper.com/new/race
// @match      http://runkeeper.com/race/*
// @match      http://runkeeper.com/races/racehub/RaceHubRaceFinder.action*
// ==/UserScript==

(function(){
    var execute = function() {
        var counter = 0;
        var timer = setInterval( function() {
            if (typeof rkMap !== "undefined" && typeof rkMap.gmap !== "undefined") {
                clearInterval(timer);
                /*var copyOSM = new GCopyrightCollection('<a href="http://www.openstreetmap.org/">OpenStreetMap</a>');

                copyOSM.addCopyright(new GCopyright(1, new GLatLngBounds(new GLatLng(-90, -180), new GLatLng(90, 180)), 0,' '));

                var tilesMapnik = new GTileLayer(copyOSM, 7, 18, {
                    tileUrlTemplate: 'http://tile.openstreetmap.org/{Z}/{X}/{Y}.png',
                    isPng: true
                });

                var mapMapnik = new GMapType([tilesMapnik], G_NORMAL_MAP.getProjection(), 'OSM');
                rkMap.gmap.addMapType(mapMapnik);
                rkMap.gmap.addControl(new GMenuMapTypeControl());
				*/
				rkMap.gmap.mapTypes.set("OSM", new google.maps.ImageMapType({
                    getTileUrl: function(coord, zoom) {
                        return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
                    },
                    tileSize: new google.maps.Size(256, 256),
                    name: "OSM",
                    maxZoom: 18,
                    isPng: true,
                    alt: "Open Street Map tiles"
                }));

                rkMap.gmap.setOptions({
                    mapTypeControlOptions: {
                        mapTypeIds: [
                            'OSM',
                            google.maps.MapTypeId.ROADMAP,
                            google.maps.MapTypeId.TERRAIN,
                            google.maps.MapTypeId.SATELLITE,
                            google.maps.MapTypeId.HYBRID
                        ],
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                    }
                });
            } else if (typeof mapController !== "undefined" && typeof mapController.model.map !== "undefined" && mapController.model.map) {
                clearInterval(timer);
                mapController.model.map.mapTypes.set("OSM", new google.maps.ImageMapType({
                    getTileUrl: function(coord, zoom) {
                        return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
                    },
                    tileSize: new google.maps.Size(256, 256),
                    name: "OSM",
                    maxZoom: 18,
                    isPng: true,
                    alt: "Open Street Map tiles"
                }));

                mapController.model.map.setOptions({
                    mapTypeControlOptions: {
                        mapTypeIds: [
                            'OSM',
                            google.maps.MapTypeId.ROADMAP,
                            google.maps.MapTypeId.TERRAIN,
                            google.maps.MapTypeId.SATELLITE,
                            google.maps.MapTypeId.HYBRID
                        ],
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                    }
                });
            } else if (counter > 10) {
                clearInterval(timer);
            }

            counter++;
        }, 1000);

    };
    var script = document.createElement("script");
    script.innerHTML = '(' + execute.toString() + ')();';
    document.head.appendChild(script);
})();