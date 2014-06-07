// ==UserScript==
// @name           Geocaching.com Eniro Maps
// @namespace      gccomenirostreet
// @include        http://www.geocaching.com/map/*
// ==/UserScript==
var main = function () {
        var uw = (this.unsafeWindow) ? this.unsafeWindow : window;
        
        if(uw.google) {
            // Custom map selector basics
            var styleblock = '<style>#custom-map-selector {margin-top: 17px;} #custom-map-selector li {list-style: none; cursor: pointer; float: left; overflow: hidden; text-align: center; position: relative; color: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 13px; background-color: #fff; padding: 1px 6px; border: 1px solid rgb(113, 123, 135);} #custom-map-selector li.active {font-weight: bold;}</style>';
            if(!$('#custom-map-selector').length) {
                $('.ui-block-b').append('<ul id="custom-map-selector"></ul>').append(styleblock);
            }
            /* Custom maps */
            // Eniro Street
            var enirostreet = {
                getTileUrl: function (a, b) {
                    return "http://ed-map-fi.wide.basefarm.net/ol_tiles/fi/maps/" + b + "/" + a.x + "/" + a.y + ".png";
                },
                tileSize: new uw.google.maps.Size(256, 256),
                isPng: true,
                minZoom: 10,
                maxZoom: 19,
                name: "enirostreet",
                alt: "Eniro",
                copyright: 'Eniro'
            }
            uw.MapSettings.Map.mapTypes.set(enirostreet.name, new uw.google.maps.ImageMapType(enirostreet));
            $('#custom-map-selector').append('<li id="enirostreet">Eniro Street</li>');
            $('#enirostreet').click(function() {
                 $('#custom-map-selector .active').removeClass('active');
                 $(this).addClass('active');
                 uw.MapSettings.Map.setMapTypeId('enirostreet');
            });
            
            // Eniro Topo
            var enirotopo = {
                getTileUrl: function (a, b) {
                    return "http://ed-map-fi.wide.basefarm.net/ol_tiles/fi/topo/" + b + "/" + a.x + "/" + a.y + ".png";
                },
                tileSize: new uw.google.maps.Size(256, 256),
                isPng: true,
                minZoom: 10,
                maxZoom: 18,
                name: "enirotopo",
                alt: "Eniro",
                copyright: 'Eniro'
            }
            uw.MapSettings.Map.mapTypes.set(enirotopo.name, new uw.google.maps.ImageMapType(enirotopo));
            $('#custom-map-selector').append('<li id="enirotopo">Eniro Topo</li>');
            $('#enirotopo').click(function() {
                 $('#custom-map-selector .active').removeClass('active');
                 $(this).addClass('active');
                 uw.MapSettings.Map.setMapTypeId('enirotopo');
            });
        } else {
            layers = uw.Groundspeak.Map.MapLayers;
    
            layers.push({
                tileUrl: 'http://ed-map-fi.wide.basefarm.net/ol_tiles/fi/maps/{z}/{x}/{y}.png',
                name: 'enirostreet',
                alt: 'Eniro Street',
                attribution: '<a href="http://www.eniro.fi/kartta" target="_blank">Street maps provided by Eniro</a>',
                tileSize: 256,
                minZoom: 10,
                maxZoom: 19,
                add_layer: true
            });
            
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
    }

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);