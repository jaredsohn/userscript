// ==UserScript==
// @name 		WME Permalink to serveral Maps
// @description This script create buttons to permalink page on several Maps.
// @namespace 	http://members.aon.at/aneumeister/scripts/waze/testmaps.user.js
// @version 	1.00.04.14
// @include     https://*.waze.com/editor/*
// @include     https://*.waze.com/*/editor/*
// @updateURL   http://userscripts.org/scripts/source/175262.meta.js
// @downloadURL http://userscripts.org/scripts/source/175262.user.js
// @grant 		none
// ==/UserScript==

// Mini howto:
// 1) install this script as greasemonkey script or chrome extension
// 2) Click on Google Maps Permalink on the sidebar
var pl2sm_version = "1.00.04.14";
if ('undefined' == typeof __RTLM_PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __RTLM_PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

function getQueryString(link, name)
{
	var pos = link.indexOf( name + '=' ) + name.length + 1;
	var len = link.substr(pos).indexOf('&');
	return link.substr(pos,len);
}

var btn0 = $('<button>ß-Switch</button>');
btn0.click(function(){
	var mapsUrl;
	var href = $('.WazeControlPermalink a').attr('href');
	
	var beta = href.indexOf('editor-beta.waze.com');
	if (beta == -1){
	  mapsUrl = href.replace('www.waze.com','editor-beta.waze.com');
	}
	else {
	  mapsUrl = href.replace('editor-beta.waze.com','www.waze.com');
	}
	window.open(mapsUrl);
});

var btn1 = $('<button>Google</button>');
btn1.click(function(){
	var href = $('.WazeControlPermalink a').attr('href');
	
	var lon = getQueryString(href, 'lon');
	var lat = getQueryString(href, 'lat');
	var zoom = parseInt(getQueryString(href, 'zoom'));
	
	zoom = zoom > 6 ? 19 : zoom + 12;		
	var mapsUrl = 'https://maps.google.com/?ll=' + lat + ',' + lon + '&z=' + zoom;
	window.open(mapsUrl,'_blank')
});

var btn2 = $('<button>Bing</button>');
btn2.click(function(){
	var href = $('.WazeControlPermalink a').attr('href');
	
	var lon = getQueryString(href, 'lon');
	var lat = getQueryString(href, 'lat');
	var zoom = parseInt(getQueryString(href, 'zoom'));
	
	zoom = zoom > 6 ? 19 : zoom + 12;		
	var mapsUrl = ' http://www.bing.com/maps/default.aspx?v=2&cp=' + lat + '~' + lon + '&lvl=' + zoom + '&sty=h';
	window.open(mapsUrl,'_blank')
});

var btn3 = $('<button>sautter.com</button>');
btn3.click(function(){
	var href = $('.WazeControlPermalink a').attr('href');
	
	var lon = getQueryString(href, 'lon');
	var lat = getQueryString(href, 'lat');
	var zoom = parseInt(getQueryString(href, 'zoom'));
	
	zoom = zoom > 4 ? 17 : zoom + 12;		
	//var mapsUrl = 'http://www.openstreetmap.org/?lat=' + lat + '&lon=' + lon + '&zoom=' + zoom + '&layers=M';
	//var mapsUrl = 'http://osm.clapps.net/?ll=' + lat + ',' + lon + '&z=' + zoom;
    //http://sautter.com/map/?zoom=15&lat=48.16681&lon=11.61252&layers=B000TFFFFFFF
    var mapsUrl = 'http://sautter.com/map/?zoom=' + zoom + '&lat=' + lat + '&lon=' + lon + '&layers=B000TFFFFFFF';
	window.open(mapsUrl,'_blank')
});

var btn3a = $('<button>OSM</button>');
btn3a.click(function(){
	var href = $('.WazeControlPermalink a').attr('href');
	
	var lon = getQueryString(href, 'lon');
	var lat = getQueryString(href, 'lat');
	var zoom = parseInt(getQueryString(href, 'zoom'));
	
	zoom = zoom > 6 ? 19 : zoom + 12;		
	var mapsUrl = 'http://www.openstreetmap.org/?lat=' + lat + '&lon=' + lon + '&zoom=' + zoom + '&layers=M';
	//var mapsUrl = 'http://osm.clapps.net/?ll=' + lat + ',' + lon + '&z=' + zoom;
	window.open(mapsUrl,'_blank')
});

var btn3b = $('<button>OSM/bing</button>');
btn3b.click(function(){
	var href = $('.WazeControlPermalink a').attr('href');
	
	var lon = getQueryString(href, 'lon');
	var lat = getQueryString(href, 'lat');
	var zoom = parseInt(getQueryString(href, 'zoom'));
	
	zoom = zoom > 6 ? 19 : zoom + 12;	
	var mapsUrl = 'http://mvexel.dev.openstreetmap.org/bingimageanalyzer/?lat=' + lat + '&lon=' + lon + '&zoom=' + zoom;
	window.open(mapsUrl,'_blank')
});

var btn4 = $('<button>ÖAMTC</button>');
btn4.click(function(){
	var href = $('.WazeControlPermalink a').attr('href');
	
	var lon = getQueryString(href, 'lon');
	var lat = getQueryString(href, 'lat');
	var zoom = parseInt(getQueryString(href, 'zoom'));
	
	zoom = 10-2*zoom;		
  zoom = (zoom<2)? 1 : zoom;
	var mapsUrl = 'http://www.oeamtc.at/maps/?lat='+lat+'&lon='+lon+'&zoom='+zoom;
	window.open(mapsUrl,'_blank')
});

var btn5 = $('<button>Google ß</button>');
btn5.click(function(){
	var href = $('.WazeControlPermalink a').attr('href');
	
	var lon = getQueryString(href, 'lon');
	var lat = getQueryString(href, 'lat');
	var zoom = parseInt(getQueryString(href, 'zoom'));
    zoom = (zoom >= 8) ? 8 : zoom;
    zoom = 70000/(Math.pow(2,zoom));

	//var mapsUrl = 'https://www.google.com/maps?t=m&ll='+lat+','+lon+'&spn='+zoomh+','+zoomv+'&output=classic';
	var mapsUrl = 'https://www.google.com/maps/preview#!data=!1m4!1m3!1d'+zoom+'!2d'+lon+'!3d'+lat;
	window.open(mapsUrl,'_blank')
}); 
                                                       
var btn6 = $('<button>geo.admin</button>');
btn6.click(function(){
	var href = $('.WazeControlPermalink a').attr('href');
	
	var lon = getQueryString(href, 'lon');
	var lat = getQueryString(href, 'lat');
	var zoom = parseInt(getQueryString(href, 'zoom'))+5;
	var phi1 = ((lat * 3600)-169028.66)/10000;
	var lmd1 = ((lon * 3600)-26782.5)/10000;
	var x = 200147.07 + 308807.95 * phi1 + 3745.25 * lmd1 * lmd1 + 76.63 * phi1 * phi1 + 119.79 * phi1 * phi1 * phi1 - 194.56 * lmd1 * lmd1 * phi1;
	var y = 600072.37 + 211455.93  * lmd1 - 10938.51  * lmd1  * phi1 - 0.36 * lmd1  * phi1 * phi1 - 44.54 * lmd1 * lmd1 * lmd1;
	var mapsUrl = 'http://map.geo.admin.ch/?Y='+y.toFixed(0)+'&X='+x.toFixed(0)+'&zoom='+zoom+'&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de';
	window.open(mapsUrl,'_blank')
});                                                        


$("#sidebar").append(btn0);
$("#sidebar").append(btn1);
$("#sidebar").append(btn5);
$("#sidebar").append(btn3a);
$("#sidebar").append(btn4);
$("#sidebar").append(btn3);
$("#sidebar").append(btn3b);
$("#sidebar").append(btn2);
$("#sidebar").append(btn6);
$("#sidebar").append('<br><a href="http://userscripts.org/scripts/show/175262" target="_blank">Permalink to several maps / V' + pl2sm_version + '</a>');
