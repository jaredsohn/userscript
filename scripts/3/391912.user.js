// ==UserScript==
// @name            RunKeeperMyMaps
// @description     Add features to RunKeeper maps
// @version         0.02 prealpha2
// @author          Thibault
// @homepageURL     http://userscripts.org/scripts/show/391912
// @supportURL      http://userscripts.org/scripts/discuss/391912
// @updateURL       
// @include         http://runkeeper.com/user/*/activity/*
// @include         http://runkeeper.com/user/*/route*
// @include         http://runkeeper.com/edit/race*
// @include         http://runkeeper.com/edit/activity*
// @include         http://runkeeper.com/new/race
// @include		      http://runkeeper.com/new/route*
// @include         http://runkeeper.com/race/*
// @include         http://runkeeper.com/races/racehub/RaceHubRaceFinder.action*
// @run-at          document-end
// @grant           GM_getValue
// @grant           GM_setValue
// @require         https://ssl.panoramio.com/wapi/wapi.js?v=1
// ==/UserScript==

// This script requires jQuery ;)
var $ = unsafeWindow.jQuery;

/* INFORMATION

/!\ This script is in pre-alpha version! It works on Google Chrome (with TamperMonkey). But maybe not everywhere... xD

License: WTFPL v.2

This user.script is a fork of the RunKeeperOSM user.script developed by Andrew Porokhin (aka nopox).

Original script:
RunKeeperOSM original script: http://userscripts.org/scripts/show/138081
Andrew Porokhin's profile: http://userscripts.org/users/nopox

My added features:
  * code simplification,
  * other layers (look below),
  * GPX download link on Route pages,

Available layers:
  * OpenStreetMap: http://www.openstreetmap.org
  * OpenCycleMap: http://www.opencyclemap.org/
  * Géoportail (IGN French maps): http://www.geoportail.gouv.fr
  * Maps-for-Free Relief: http://www.maps-for-free.com/ // not displayed by default
 
Under development:
  * Configuration area
  * Other layers:
    * Panoramio
    * American topography maps (if someone knows a free service?)
  * Fullscreen mode (RunKeeper decided to delete the one which existed...)
  * Some corrections (GPX file...)

Any suggestion? Propose! (^_^)
  
*/

/* CONFIGURATION AREA */



/* MAIN FUNCTION */

(function(){
  var execute = function() {
    var counter = 0;
    var timer = setInterval( function() {
      if ((typeof rkMap !== "undefined" && typeof rkMap.gmap !== "undefined")||(typeof mapController !== "undefined" && typeof mapController.model.map !== "undefined" && mapController.model.map)) {
        clearInterval(timer);
        
        if (typeof rkMap !== "undefined" && typeof rkMap.gmap !== "undefined") {
          MyMap = rkMap.gmap;
        }
        else if (typeof mapController !== "undefined" && typeof mapController.model.map !== "undefined" && mapController.model.map) {
          MyMap = mapController.model.map;
        }
        
        // GLOBAL MAPS SERVICES
        // OpenStreetMap 'standard' layer
        MyMap.mapTypes.set("OSM_standard", new google.maps.ImageMapType({
          getTileUrl: function(coord, zoom) {
            return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
          },
          tileSize: new google.maps.Size(256, 256),
          name: "OSM",
          maxZoom: 18,
          isPng: false,
          alt: "Open Street Map standard tiles"
        }));
        
        // OpenCycleMap
        MyMap.mapTypes.set("OSM_cycle", new google.maps.ImageMapType({
          getTileUrl: function(coord, zoom) {
            return "http://tile.opencyclemap.org/cycle/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
          },
          tileSize: new google.maps.Size(256, 256),
          name: "OSM Cycle",
          maxZoom: 18,
          isPng: false,
          alt: "Open Cycle Map standard tiles"
        }));
        
        // LOCAL MAPS SERVICES

        
        	//Define OSGeo maptype
          // MyMap.mapTypes.set ("OSGeo", new google.maps.ImageMapType({
              // getTileUrl: function (coord, zoom) {
                // return map_url + "&zoom=" + zoom + "&x=" + coord.x + "&y=" + coord.y;
              // },
              // tileSize: new google.maps.Size(256, 256),
              // isPng: true,
              // alt: "OSGeoMap",
              // name: name,
              // minZoom: min,
              // maxZoom: max
            // });
            // return OSGeoMap;
          // }
        
        // France - Géoportail (IGN)
        MyMap.mapTypes.set("IGN", new google.maps.ImageMapType({
          getTileUrl: function(coord, zoom) {
            return "http://wxs.ign.fr/tgde3wqquyqvtunm5zmn21ta/geoportail/wmts?"+
              "LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS"+
              "&FORMAT=image/jpeg&SERVICE=WMTS&VERSION=1.0.0"+
              "&REQUEST=GetTile&STYLE=normal&TILEMATRIXSET=PM"+
              "&TILEMATRIX="+zoom+"&TILEROW="+coord.y+
              "&TILECOL="+coord.x;
          },
          tileSize: new google.maps.Size(256,256),
          name: "IGN (Fr)",
          maxZoom: 18,
          alt: "French IGN Géoportail tiles"
        }));
        
         // France - Géoportail (Orthophotos)
        MyMap.mapTypes.set("IGN_alt", new google.maps.ImageMapType({
          getTileUrl: function(coord, zoom) {
            return "http://wxs.ign.fr/tgde3wqquyqvtunm5zmn21ta/geoportail/wmts?"+
              "LAYER=ORTHOIMAGERY.ORTHOPHOTOS"+
              "&FORMAT=image/jpeg&SERVICE=WMTS&VERSION=1.0.0"+
              "&REQUEST=GetTile&STYLE=normal&TILEMATRIXSET=PM"+
              "&TILEMATRIX="+zoom+"&TILEROW="+coord.y+
              "&TILECOL="+coord.x;
          },
          tileSize: new google.maps.Size(256,256),
          name: "Imagery (Fr)",
          maxZoom: 18,
          alt: "French IGN Géoportail tiles"
        }));
        
        // OTHER LAYERS TYPES
        // Under developpement
        // Panoramio
        
        // Define Relief layer (just for the fun, not very usefull)
        MyMap.mapTypes.set ("relief", new google.maps.ImageMapType({
          getTileUrl: function(coord, zoom) {
            return "http://maps-for-free.com/layer/relief/z" + zoom + "/row" + coord.y + "/" + zoom + "_" + coord.x + "-" + coord.y + ".jpg"; },
            tileSize: new google.maps.Size(256, 256),
            isPng: false,
            minZoom: 0,
            maxZoom: 11,
            name: "Relief",
            alt: "maps-for-free.com"
         }));

        // MENU
        MyMap.setOptions({
          mapTypeControlOptions: {
            mapTypeIds: [
              'OSM_standard',
              'OSM_cycle',
              'IGN',
              'IGN_alt',
              //'relief', // not displayed by default
              google.maps.MapTypeId.ROADMAP,
              google.maps.MapTypeId.TERRAIN,
              google.maps.MapTypeId.SATELLITE,
              google.maps.MapTypeId.HYBRID,
              ],
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
          },
          streetViewControl: true,
        });
      }
      else if (counter > 100) {
        clearInterval(timer);
      }
    counter++;
    }, 1000);
    
    // GPX file from Route
    var counter2 = 0;
    var timer2 = setInterval( function() {
      if (typeof routePoints !== "undefined") {
        clearInterval(timer2);
        
        // Encoding/Decoding HTML entities
        function htmlEncode(value){
          if (value) {
            return jQuery('<div />').text(value).html();
          }
          else {
            return '';
          }
        }
        function htmlDecode(value) {
          if (value) {
            return $('<div />').html(value).text();
          }
          else {
            return '';
          }
        }
        
        // Data for Header
        RouteName = htmlEncode($('h2.userHeader').contents().filter(function () { return this.nodeType === 3; }).text().trim());
        RouteDescription = htmlEncode($('.mainColumnPadding p').text());
        RouteURL = self.location.href;
        RouteAuthor = htmlEncode($('p.userName').text());
        RouteAuthorProfileURL = $('a.avatar').prop('href');
        RouteDistance = $('h2.userHeader span.details').text();
        RouteDistance = RouteDistance.substring(1,RouteDistance.length-1);
        RouteType = $('meta[property="og:type"]').attr('content');
        
        // GPX Header
        routePointsToGpxHeader = '<?xml version="1.0" encoding="UTF-8"?>\n'
            + '<gpx\n'
            + 'version="1.1"\n'
            + 'creator="RK MyMaps by Thibault (UserScript) - %lien%"\n'
            + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n'
            + 'xmlns="http://www.topografix.com/GPX/1/1"\n'
            + 'xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd"\n'
            + 'xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1">\n'
            + '  <metadata>\n'
            + '    <name>'+RouteName+' ('+RouteType+')</name>\n'
            + '    <author>'+RouteAuthor+' ('+RouteAuthorProfileURL+')</author>\n'
            + '    <desc>'+RouteDescription+'</desc>\n'
            + '    <link href="'+RouteURL+'">\n'
            + '      <text>'+RouteAuthor+'\'s '+RouteType+' route: \"'+RouteName+'\" ('+RouteDistance+') | RunKeeper</text>\n'
            + '    </link>\n'
            + '    <time>YYYY-MM-DDThh:mm:ssZ</time>\n'
            + '    <bounds minlat="%minlat%" minlon="%minlon%" maxlat="%maxlat%" maxlon="%maxlon%"/>\n'
            + '  </metadata>\n'
            + '  <rte>\n'
            + '    <name>'+RouteName+'</name>\n'
            + '    <type>'+RouteType+'</type>\n';
        
        // Converting Json Array to JavaScript Array (points data)
        routePointsArray = Object.keys(routePoints).map(function(key) {
          return {
            lat: this[key].latitude,
            lon: this[key].longitude,
            ele: this[key].altitude
          };
        }, routePoints);
        
        // GPX Body
        routePointsToGpxBody = '';
        for(i=0; i<routePointsArray.length; i++) {
          routePointsToGpxBody += '    <rtept lat="'+routePointsArray[i].lat+'" lon="'+routePointsArray[i].lon+'"><ele>'+routePointsArray[i].ele+'</ele></rtept>\n';
        }
        
        // GPX Footer
        routePointsToGpxFooter = ''
            + '  </rte>\n'
            + '</gpx>';
        
        // GPX file content
        routePointsToGpx = routePointsToGpxHeader + routePointsToGpxBody + routePointsToGpxFooter;
        
        // GPX file generation
        contentType = 'text/xml;charset=utf-8';
        window.URL = window.webkitURL || window.URL;
        var gpxFile = new Blob([routePointsToGpx], {type: contentType});
        var a = document.createElement('a');
        a.download = 'myMap.gpx';
        a.href = window.URL.createObjectURL(gpxFile);
        a.textContent = 'GPX';
        a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
        
        // GPX download link div
        var DownloadRouteDiv = '<div id="advancedOptions" class="clearfix">\n'
            + '  <div class="mainColumnPadding clearfix">\n'
            + '    <h4>Export</h4>\n'
            + '    <div id="exportOptions">\n'
            + '    </div>\n'
            + '  </div>\n'
            + '</div>\n'
        $(DownloadRouteDiv).insertAfter($('#routeChartContainer'));
        
        // Insert the links in the download links div
        $('#exportOptions').append(a);
        
      }
      else if (counter2 > 100) {
        clearInterval(timer2);
      }
    counter2++;
    }, 1000);
    
  };
    var script = document.createElement("script");
    script.innerHTML = '(' + execute.toString() + ')();';
    document.head.appendChild(script);
})();