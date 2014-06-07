// ==UserScript==
// @name          WME Danske Permalinks
// @description   This script create a buttons to different map services.
// @grant         none
// @version       0.2
// @include       https://*.waze.com/editor/*
// @include       https://*.waze.com/*/editor/*
// @include       https://*.waze.com/map-editor/*
// @include       https://descartes.waze.com/beta/*
// @include       https://descartesw.waze.com/beta/*
// ==/UserScript==
// build on: WME Permalink to Google Maps

// Mini howto:
// 1) install this script as greasemonkey script or chrome extension
// 2) Click on the buttons on the sidebar

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

var btnGoogle = $('<a>Google</a>');
btnGoogle.click(function(){
	var href = $('.WazeControlPermalink a').attr('href');
	
	var lon = getQueryString(href, 'lon');
	var lat = getQueryString(href, 'lat');
	var zoom = parseInt(getQueryString(href, 'zoom'));
	
	zoom = zoom > 6 ? 19 : zoom + 12;		
	var mapsUrl = 'https://maps.google.com/?ll=' + lat + ',' + lon + '&z=' + zoom;
	window.open(mapsUrl,'_blank')
});


var btnKrak = $('<a>Krak</a>');
btnKrak.click(function(){
	var href = $('.WazeControlPermalink a').attr('href');
	
	var lon = getQueryString(href, 'lon');
	var lat = getQueryString(href, 'lat');
	var zoom = parseInt(getQueryString(href, 'zoom'));
	
	zoom = zoom > 6 ? 19 : zoom + 10;		

  var mapsUrl = 'http://map.krak.dk/vis?profile=dk_krak&MapTypeId=hybrid&center=' + lat + ',' + lon + '&zoom=' + zoom;
	window.open(mapsUrl,'_blank')
});


var btnOsm = $('<a>OSM</a>');
btnOsm.click(function(){
	var href = $('.WazeControlPermalink a').attr('href');
	
	var lon = getQueryString(href, 'lon');
	var lat = getQueryString(href, 'lat');
	var zoom = parseInt(getQueryString(href, 'zoom'));
	
	zoom = zoom > 6 ? 19 : zoom + 12;		

  var mapsUrl = 'http://www.openstreetmap.org/?lat=' + lat + '&lon=' + lon + '&zoom=' + zoom + '&layers=M';
	window.open(mapsUrl,'_blank')
});

var btnOsmFugro = $('<a>OSM+Fugro</a>');
btnOsmFugro.click(function(){
	var href = $('.WazeControlPermalink a').attr('href');
	
	var lon = getQueryString(href, 'lon');
	var lat = getQueryString(href, 'lat');
	var zoom = parseInt(getQueryString(href, 'zoom'));
	
	zoom = zoom > 6 ? 19 : zoom + 12;		

  var mapsUrl = 'http://fugro.openstreetmap.dk/?lat=' + lat + '&lon=' + lon + '&zoom=' + zoom + '&layers=BTFFF';
	window.open(mapsUrl,'_blank')
});


var btnStednavne = $('<a>Stednavne</a>');              //<button>Stednavne</button>
btnStednavne.click(function(){
  var mapsUrl = 'http://www.stednavne.info';
  window.open(mapsUrl,'_blank')
});


var btnDigidag = $('<a>Digdag</a>');
btnDigidag.click(function(){
  var mapsUrl = 'http://digdag.dk';
  window.open(mapsUrl,'_blank')
});

$("#sidebar").append('[ ').append(btnGoogle).append(' | ').append(btnKrak).append(' | ').append(btnOsm).append(' | ').append(btnOsmFugro).append(' ]');
$("#sidebar").append('<br>[ ').append(btnStednavne).append(' | ').append(btnDigidag).append(' ]');
