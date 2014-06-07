// ==UserScript==
// @name           Geocaching.com Beta-map Eniro topo
// @namespace      gccomenirotopo
// @include        http://www.geocaching.com/map/default.aspx*
// ==/UserScript==
var main = function () {
        var uw = (this.unsafeWindow) ? this.unsafeWindow : window;
        layers = uw.Groundspeak.Map.MapLayers;

        layers.push({
            tileUrl: 'http://ed-map-fi.wide.basefarm.net/ol_tiles/fi/topo/{z}/{x}/{y}.png',
            name: 'enirotopo',
            alt: 'Eniro Topo',
            attribution: '<a href="http://www.eniro.fi/kartta" target="_blank">Topo maps provided by Eniro</a>',
            tileSize: 256,
            minZoom: 0,
            maxZoom: 18,
            add_layer: true
        });

        layers.push({
            tileUrl: "http://tiles.kartat.kapsi.fi/peruskartta/{z}/{x}/{y}.jpg",
            name: "kapsitopo",
            alt: "Peruskartta (Kapsi)",
            attribution: "MML 2012",
            subdomains: "1",
            tileSize: 256,
            minZoom: 0,
            maxZoom: 18,
            add_layer: true
        });

        layers.push({
            tileUrl: "http://tiles.kartat.kapsi.fi/ortokuva/{z}/{x}/{y}.jpg",
            name: "kapsiorto",
            alt: "Ortokuvat (Kapsi)",
            attribution: "MML 2012",
            subdomains: "1",
            tileSize: 256,
            minZoom: 0,
            maxZoom: 18,
            add_layer: true
        });

        layers.push({
            tileUrl: "http://mt.google.com/vt?x={x}&y={y}&z={z}",
            name: "googlemaps",
            alt: "Google maps",
            attribution: "Google maps",
            subdomains: "1234",
            tileSize: 256,
            minZoom: 0,
            maxZoom: 18,
            add_layer: true
        });
        
        if (uw.MapSettings.Map != null) {
            new_div = document.createElement('div');
            new_div.id = 'map_canvas';
            new_div.setAttribute("class", 'Map');
            new_div.setAttribute("style", 'width: 100%; height: 100%;');
            old_map = document.getElementById("map_canvas");


            pn = old_map.parentNode;
            pn.removeChild(old_map);
            pn.appendChild(new_div);

            uw.CreateMap();
        }

    }

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);