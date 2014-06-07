// ==UserScript==
// @name           Waze4Twitter
// @namespace      erlichmen.net
// @include        http://twitter.com/*
// @version         1.2
// ==/UserScript==


var initGeoPin ='\
        var map_canvas=$("#map_canvas");\
        var frame=$("<iframe></iframe>");\
        frame.attr("id", "map");\
        frame.attr("scrolling", "no");\
        frame.attr("marginwidth", "0");\
        frame.attr("marginheight", "0");\
        frame.attr("frameborder", "0");\
        var GM_WazeInit2 = document.createElement("script");\
        GM_WazeInit2.type = "text/javascript";\
        GM_WazeInit2.src = "http://jquery-aop.googlecode.com/hg/src/aop.js";\
        GM_WazeInit2.onload = function() {\
          $.aop.before({target: twttr.geo.mapsUI, method: "openMapModal"}, function(meta, target) {\
            $("body").data("waze_meta", meta);\
            console.debug(meta);\
          });\
          $.aop.after({target: twttr.geo.mapsUI, method: "openMapModal"}, function(result) {\
            $("#map_canvas").hide();\
            if ($("#map", $(".map_container")).length == 0) {\
              frame.attr("width", "600px");\
              frame.attr("height", "400px");\
              $(".map_container").prepend(frame);\
            }\
            var data = $("body").data("waze_meta");\
            frame.attr("src", "http://maps.freemap.co.il/api/openlayers/?zoom=8&lat="+data[0].latlng[0]+"&lon="+data[0].latlng[1]+"&marker=true");\
          });\
        };\
        document.getElementsByTagName("head")[0].appendChild(GM_WazeInit2);'
               
var GM_WazeInit1 = document.createElement('script');
GM_WazeInit1.type = 'text/javascript';
GM_WazeInit1.text = initGeoPin;
document.getElementsByTagName('head')[0].appendChild(GM_WazeInit1);

