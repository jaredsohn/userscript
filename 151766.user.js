// ==UserScript==
// @name WME Permalink to Google Maps
// @description This script create a button to permalink page on Google Maps.
// @namespace http://www.tay-tec.de/waze-street-to-river
// @grant none
// @version 12.11.05.1
// @include https://*.waze.com/editor/*
// @include https://*.waze.com/map-editor/*
// @include https://descartes.waze.com/beta/*
// @include https://descartesw.waze.com/beta/*
// ==/UserScript==

// Mini howto:
// 1) install this script as greasemonkey script or chrome extension
// 2) Click on Google Maps Permalink on the sidebar

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

var btn1 = $('<button>Google Maps Permalink</button>');
btn1.click(function(){
	var href = $('.WazeControlPermalink a').attr('href');
	
	var lon = getQueryString(href, 'lon');
	var lat = getQueryString(href, 'lat');
	var zoom = parseInt(getQueryString(href, 'zoom'));
	
	zoom = zoom > 6 ? 19 : zoom + 12;		
	var mapsUrl = 'https://maps.google.com/?ll=' + lat + ',' + lon + '&z=' + zoom;
	window.open(mapsUrl,'_blank')
});
$("#sidebar").append(btn1);