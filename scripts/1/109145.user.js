// ==UserScript==
// @name	Geocaching Map Enhancements
// @version	0.6.9.2
// @namespace	inge.org.uk/userscripts
// @description	Adds Ordnance Survey maps and grid reference search to Geocaching.com, along with several other enhancements.
// @include	http://www.geocaching.com/*
// @include	https://www.geocaching.com/*
// @grant	none
// @license	MIT License; http://www.opensource.org/licenses/mit-license.php
// @copyright	2011-14, James Inge (http://geo.inge.org.uk/)
// @attribution GeoNames (http://www.geonames.org/)
// @attribution Chris Veness (http://www.movable-type.co.uk/scripts/latlong-gridref.html)
// @icon	http://geo.inge.org.uk/userscripts/GeocachingMap48.png
// @updateURL	http://geo.inge.org.uk/userscripts/GeocachingMapEnhancements.meta.js
// ==/UserScript==

(function () {
"use strict";
var debug = true;

// Default parameters
var GME_parameters = {
	version: "0.6.9.2",
	brightness: 1,	// Default brightness for maps (0-1), can be overridden by custom map parameters.
	filterFinds: false,	// True filters finds out of list searches.
	follow: false,	// Locator widget follows current location (moving map mode)
	labels: "codes", // Label caches on the map with their GC code. Or "names" to use long name.
	measure: "metric",	// Or "imperial" - used for the scale indicators
	osgbSearch: true,		// Enhance search box with OSGB grid references, zooming, etc. (may interfere with postal code searches)
	useNewTab: true,		// True opens geocache lists in a new window, rather than replacing the map.
	defaultMap: "MapQuest",
	maps: [
//	{alt:"Readable Name", tileUrl: "URL template including {s} (subdomain) and either {q} (quadkey) or {x},{y},{z} (Google/TMS tile coordinates + zoom)", subdomains: "0123", minZoom: 0, maxZoom: 24, attribution: "Copyright message (HTML allowed)", name: "shortname", overlay:false }
		{alt:"MapQuest",tileUrl:"http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg",name:"mpqosm",subdomains:"1234"},
		{alt:"CloudMade",tileUrl:"http://{s}.tile.cloudmade.com/31913eba82dc43a998d52a5804668c11/997/256/{z}/{x}/{y}.png",name:"cloudmade",subdomains:"ab",ignore:true},
		{tileUrl:"http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg",name:"mpqa",alt:"MapQuest Aerial",subdomains:"1234"},
		{alt:"OpenStreetMap",tileUrl:"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",name:"osm",subdomains:"abc"},
		{alt:"OpenCycleMap",tileUrl:"http://tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",name:"ocm"},
		{alt:"Bing Maps", tileUrl: "http://ecn.t{s}.tiles.virtualearth.net/tiles/r{q}?g=864&mkt=en-gb&lbl=l1&stl=h&shading=hill&n=z", subdomains: "0123", minZoom: 1, maxZoom: 20, attribution: "<a href=\'http://maps.bing.com/\'>Bing</a> map data copyright Microsoft and its suppliers", name: "bingmap",ignore:true},
		{alt:"Bing Aerial View", tileUrl: "http://ecn.t{s}.tiles.virtualearth.net/tiles/a{q}?g=737&n=z", subdomains: "0123", minZoom: 1, maxZoom: 20, attribution: "<a href=\'http://maps.bing.com/\'>Bing</a> map data copyright Microsoft and its suppliers", name: "bingaerial" },
		{alt:"Google Maps",tileUrl:"http://mt.google.com/vt?&x={x}&y={y}&z={z}",name:"googlemaps",attribution:"<a href=\'http://maps.google.com/\'>Google</a> Maps",subdomains:"1234",tileSize:256,maxZoom:22},
		{alt:"Google Satellite",tileUrl:"http://mt.google.com/vt?lyrs=s&x={x}&y={y}&z={z}",name:"googlemapssat",attribution:"<a href=\'http://maps.google.com/\'>Google</a> Maps Satellite",subdomains:"1234",tileSize:256,maxZoom:22},
		{alt:"Ordnance Survey", tileUrl: "http://ecn.t{s}.tiles.virtualearth.net/tiles/r{q}?g=737&productSet=mmOS", subdomains: "0123", minZoom: 10, maxZoom: 17, attribution: "Ordnance Survey imagery from <a href=\'http://maps.bing.com/\'>Bing Maps</a>", name: "bingos" },
		{alt:"London Street Maps", tileUrl: "http://ecn.t{s}.tiles.virtualearth.net/tiles/r{q}?g=864&productSet=mmCB", subdomains: "0123", minZoom: 14, maxZoom: 17, attribution: "<a href=\'http://maps.bing.com/\'>Bing</a> map data copyright Microsoft and its suppliers", name: "binglondon",ignore:true},
		{alt:"Hillshading", tileUrl:"http://toolserver.org/~cmarqu/hill/{z}/{x}/{y}.png", attribution:"Hillshading by <a	href=\'http://wiki.openstreetmap.org/wiki/User:Colin_Marquardt/Hike_%26_Bike_Map\'>Colin Marquardt</a> from NASA SRTM data", overlay:true}
	]
};

var GME_capabilities = {
	dragdrop: (document.createElement('span').draggable !== undefined),
	geolocation: !!navigator.geolocation,
	log: (window.console !== undefined),
	loggedin: (!!document.getElementById("ctl00_divSignedIn") || ( document.getElementById("uxLoginStatus_uxLoginURL") !== null && document.getElementById("uxLoginStatus_uxLoginURL").innerHTML !== "Log in")),
	storage: false
};
try {
	if( window.localStorage !== undefined && window.localStorage !== null ) { GME_capabilities.storage = true; }
} catch(e) {
	/*Potential security exception*/
	GME_capabilities.storage = false;
	log( "No localStorage capability - GME cannot set configuration" );
}

var GME_page = document.location.pathname,
GME_page_listing = /\/geocache\/GC|\/seek\/cache_details\.aspx|\/seek\/cache_details2\.aspx/.test(GME_page),
GME_page_maps = /\/map\//.test(GME_page),
GME_page_plan = /\/hide\/planning\.aspx/.test(GME_page),
GME_page_seek = /\/seek\/$|\/seek\/default\.aspx/.test(GME_page),
GME_page_track = /\/track\/map_gm\.aspx/.test(GME_page);

var tickIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAXCAYAAAAYyi9XAAAALHRFWHRDcmVhdGlvbiBUaW1lAFRodSAxNyBNYXkgMjAxMiAyMjoxMjo1MiAtMDAwMP%2F5zBkAAAAHdElNRQfcBREVNTVnAq5wAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC%2FxhBQAAAnRJREFUeNq9lMlrFEEUh19VdU3P1j0koujFmYzE4B8gCaIXTx6SgODFBUTw4lkv4kHxKuLFs4JHEZQkF0GM%2B4KIATHE4DATBMmiSetktq7NVxM7DB4n03nQdHdtv%2FreRmAbrFAo%2BM4e55477Oad7RAkaTKmq%2FqYrMgE3Q464pJL7kGXAQMRu6ClAwEHUodSjlpUzVhdGtElR5IU6QC%2FF2IltHSEkP3%2BOZ833zQFSZKnsRFGdJnxjOPsciD8GoZA4X5shG06Rga9k14inAtxANbkgvwci%2BAm3WiG830c6k%2Fqkqboq0qlUo3FpZ10%2Bo%2BG1kxLgoRJO9dzwn90F%2F2zvsMHuY0d6HXdkEvyWSyClo56tJA9kXUxbtB43tCEk3nTMMt2vmuXIkkaXz4%2BSxgb00nnnfZSbDcDFIHmBywHTqZwjexaEA9m2Ixv6po%2BjkRvi35xAmP1kqTI4TbdeDZp14mSAPldShR%2BHO3tShBvq4peccY0zXm2k42xPDuCBwuMFfPObNBZw2SxrxVs3HNbErSGh9xl%2FWxEr%2BlT%2Fdf6d%2FA8B13Xmu%2Fl7bwwytj4CZqmL0qVUjXa13XSIGWoVtVlY8xscCOwbQsSQwmKbm3Pqx%2FKEiq82GTnvi1lKYoumqq5IMqiGtwOlBFmcy6cbXeXmvqlXvdM0Fr5W%2FkdGLi6%2FmBd1x7VNgZR13YXkiCf8G%2Bxp4LWMFnu0CSdCG4FYbvQA%2BwuH1sS4zgZlUxkrBeCQRCInJt7DxxGxbzIsT7GalO1lvltrgSrwXLnWtILwcgGhgaOYpE%2FpH3Uw5L5olbUMBLWe%2B7SyEzLTOOJ19VP1cLmPf2%2FmLW%2FylgqETpxl%2BsAAAAASUVORK5CYII%3D",
	markerIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAZCAYAAADuWXTMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOQSURBVDiNhdRPSCNXHAfw7xs1mc5MjP9itE5ISjVGQrGxKgu6FIzx1CCskKunsj1YKN68tRdPBQ89hdKLl8JmLRR6sGzAPXRB0VVML2Y3kpDBJkHNv3EmTZjx14tZdM3aHzx4vPf78OP9Hu8xIsJNMABfxuPx7xKJxMT5%2BXn3xcWF0NfXpzscjtL4%2BPjrYDD4I4BXTQAiAhF1xWKxg%2BHhYRoYGCCfz0d%2Bv58CgQD5%2FX7y%2BXw0ODhIY2NjFIvFdonITkRgRMQ2NjZO19fXPxkdHUVPTw8AQFVVqKoKm80Gm80GACgWi0gmk1hbW0uvrq5%2BynZ2dlaWlpZ%2BmpychNVqRalUwv7%2B%2FhUR%2FQPgbwCfMcY%2Bnpqakrq7u1Gv13FwcICtra1v2fLy8sHe3t4XIyMjKBQKdHh4eG4YxhMienc2xthMe3v7bxMTEw6n08lSqRSmp6dfc7lcThZFEYZh4Pj4%2BMowjMe34U1fXhmG8fhmH4IgIJfLyVw%2Bn%2B8SBAGKopBhGDEieoMWQURvDMOIKYpCgiCgUCjYuUKhYBEEAaqq1k3TfNEKNsM0zReqqtZvsJUTBKHRaDSgqqoJ4O1DGMBbVVXNRqMBnucbnNvtzpbLZYii2AZA%2Fh8si6LYVqlU4Ha7FW5oaGi3VqtBkiQrx3GPHpIcxz2SJMlaq9Ugy%2FIu19nZua3rOmRZZhaLZYUx1tcKMsb6LBbLiizLTNd1SJL0J5fJZLaq1eo1Ywxer1fkef4lY2zoPTjE8%2FxLr9crchyHSqVynUwmnzMiwsLCwmE%2Bnw94PB4oikInJye1tra2PzRN%2B0sUxVnTNL%2Fy%2BXwfuVwulslk0N%2FffxyPxz9vBwCXy%2FV9IpH43ePxwOVyMYfDIVxeXkY0TYuIooje3l7wPA8AuLi4QCAQ%2BAEAWPNJut3ufz0ej9Vut3%2BwYdVqFaenp3VFUXgA4Jobs7Ozz3K53IP3lMvlMDMz8%2Fxd95sTSZK%2BKZfLpqZpLaGu6ygWi6bFYnl6D0ejUX1%2Bfv7XbDbbEmezWczNzT3b3NzU7mEAsNlsTyuVinl1dXUHapqGUqlkWq3Wr2%2Bv38HRaFQPh8M%2Fp1KpOziVSiEcDv9yuypwq9u3IxAIlBljdlmWcXZ2huvr68rR0VHX%2B3ncPQkgFAotptNpVKtVpNNphEKhxVZ5zd%2Fz3ohEItsdHR0UiUS2P5TTsjIAOJ3OxWAwmHQ6na2rAvgPIb3JdHxMgbEAAAAASUVORK5CYII%3D",
	markerIconSmall = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAPCAYAAAA2yOUNAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAARNgAAETYBbRc9XAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAECSURBVCiRXc8xL4NRGMXxX980EhMWFpE0goFYdWonSTvxHYTJLGIymHyELv0MLHeweFneySBiITFQqaHEKqjBo4n3LM895%2F5zz3Mrw%2BFQu1mvYw%2BzmMIbnnCc8qKotBpr8zhDDa94D3ASD1jP0A3gHptYwEb4GrpVTGCIbsqLS7%2B6aDfrXRxhIsM4HtHxX53Ix7PY4RufJegz8vcMA8xhqwRtRT7IcIIvbLeb9WWIuRMvnVZajbUxXGMJL1E%2FiWncYSVLefGB86iYwWIAcJ7y4iMLc4heaade5DJIedHHTQm6TXnxPIJCB%2BjHuY%2F9v4sRlPLiCil%2BmsKDaqliF6sxR%2FoBZ6dQNafC%2BAMAAAAASUVORK5CYII%3D";

function log( text ) {
	if( debug && GME_capabilities.log ) { console.log("GME: " + text); }
}

//don't run on frames or iframes
if (window.top !== window.self) { return; }

if(!(typeof JSON === 'object' && typeof JSON.parse === 'function')) {
	log("Geocaching Map Enhancements requires a browser with JSON support.");
	return;
}

if(document.querySelector("head[data-gme-version]")) {
	log("Aborting: GME already running on page.");
	return;
}
document.documentElement.firstChild.setAttribute("data-gme-version", GME_parameters.version);	

function insertScript( src, id ) {
log("Inserting script: " + id );
//log(src);
	if(typeof src !== "string") { log("insertScript not called with string."); return;	}
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.text = src;
	if(id) {
		src.id = id;
	}
	document.documentElement.firstChild.appendChild(s);
	document.documentElement.firstChild.removeChild(s);
}

function insertCSS( css ) {
	if(typeof css !== "string") { log("insertCSS not called with string."); return;	}
	var style = document.createElement('style');
	style.type = 'text/css';
	if (style.styleSheet){
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
	document.documentElement.firstChild.appendChild(style);
}

function insertPage( div, src, title, back ) {
	if( div && typeof src === 'string' ) {
		var d = document.createElement('div');
		d.id = div;
		d.title = title||'';
		d.innerHTML = ['<div><a href="#',back||'','" title="Close" class="gme-close-dialog">X</a><header>',d.title, '</header><div class="gme-modal-content">', src, '</div></div>'].join('');
		d.className = 'gme-modalDialog';
		document.documentElement.lastChild.appendChild(d);
	} else {
		log("insertPage not called with correct parameters.");
	}
}

if( GME_capabilities.storage ) {
	var a, b, customJSON, GME_custom, paramsJSON, storedParams;
	try {
		paramsJSON = localStorage.getItem("GME_parameters");
		if( paramsJSON ) {
			try {
				storedParams = JSON.parse(paramsJSON);
				if( storedParams.version !== GME_parameters.version ) {
					for( a in GME_parameters ) {
						if(GME_parameters.hasOwnProperty(a)) {
							if(storedParams[a]===undefined){storedParams[a]=GME_parameters[a];}
						}
					}
					alert( "Geocaching Map Enhancements has been updated to v" + GME_parameters.version +". You may want to check your GME configuration." );
					storedParams.version = GME_parameters.version;
					localStorage.setItem("GME_parameters",JSON.stringify(storedParams));
				}
				if( typeof storedParams.maps === "string" ) {
					log("Trying to fix corrupted map settings.");
					storedParams.maps = JSON.parse( storedParams.maps );
				}
				GME_parameters = storedParams;
			} catch (e) {
				log("Could not parse stored configuration parameters.");
			}
		} 
		/* Import old-style custom maps */
		customJSON = localStorage.getItem("GME_custom");
		if( customJSON ) {
log("Found stored custom");
			try {
				GME_custom = JSON.parse(customJSON);
				if(GME_custom.maps && GME_custom.maps.length > 0) {
					GME_parameters.maps = GME_parameters.maps.concat( GME_custom.maps );
				}
				delete localStorage.GME_custom;
			} catch (e) {
				log("Could not parse stored custom maps.");
			} 
		}
		/* Remove old-style builtin maps */
		if( GME_parameters.includeMaps ) {
			delete GME_parameters.includeMaps;
		}
		if( GME_parameters.excludeMaps ) {
			for( a = GME_parameters.excludeMaps.length - 1; a >= 0; a-- ) {
				for( b = GME_parameters.maps.length -1; b >= 0; b-- ) {
					if( GME_parameters.maps[b].alt === GME_parameters.excludeMaps[a] ) {
						GME_parameters.maps[b].ignore = true;
					}
				}
			}
			delete GME_parameters.excludeMaps;
		}
		localStorage.setItem("GME_parameters",JSON.stringify(GME_parameters));
	} catch(e){
		log( "Bad Exception: " + e);
		/* Potential security exception. Carry on with default parameters, but block localstorage */
		GME_capabilities.storage = false;
	}
}

var GME_css = ['\
	.leaflet-control-gme,.leaflet-control-zoomwarning {border-radius:7px; filter: progid:DXImageTransform.Microsoft.gradient(startColorStr="#3F000000",EndColorStr="#3F000000"); padding:5px;z-index:8;}\
	.leaflet-control-gme {display: inline-block; padding: 0; background: rgba(0, 0, 0, 0.2); box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);}\
	.gme-control-scale {bottom:5em !important;margin-left:13px !important; left: 30px;}\
	.gme-left {left: 30px; margin-left:13px !important;}\
	div.gme-identify-layer {margin-top:-1em;margin-left:1em;padding-left:0.1em;font-weight:bold;background:rgba(255,255,255,0.57);}\
	#gme_caches table { margin-top: 0.5em; }\
	.GME_search_list { border: 1px solid #ccc; border-radius: 7px; }\
	.GME_search_results.hidden { display: none; }\
	.groundspeak-control-findmylocation { border: 1px solid #888; border-radius: 5px; box-shadow: 0 0 8px rgba(0, 0, 0, 0.4); padding:0; background:rgba(255,255,255,0.8);}\
	.groundspeak-control-findmylocation a { padding: 3px; }\
	a.gme-button, span.gme-button { display: inline-block; box-sizing: content-box; -moz-box-sizing: content-box; padding:3px; vertical-align:middle; background:url(http://www.geocaching.com/map/css/themes/images/icons-18-black.png) no-repeat #eee; background-color: rgba(255,255,255,0.8); border: 1px solid #888; border-right:0; height:19px; width:19px; text-decoration: none; }\
	a.gme-button-l, span.gme-button-l { border-bottom-left-radius:5px; border-top-left-radius:5px; }\
	a.gme-button-r, span.gme-button-r { border-right: 1px solid #888; border-bottom-right-radius: 5px; border-top-right-radius:5px; margin-right:0.5em;}\
	a.gme-button:hover { background-color: #fff; }\
	a.gme-button-active {border:solid 3px #02b; padding:1px 0 1px 1px; background-color:#fff;}\
	a.gme-button-active:hover {border-color:#63f;filter:alpha(opacity=100);}\
	span.gme-button, a.gme-button-wide { padding-left:5px; padding-right:5px; font-size:12px; font-weight:bold; width:auto; background-image:none; color: #424242; }\
	.gme-button-wide:hover { color: #ccc; }\
	a.GME_home { background-position: -572px 4px;}\
	a.GME_config { background-position: -284px 4px;}\
	a.gme-button-refresh-labels { background-position: -320px 4px;}\
	a.gme-button-clear-labels { background-position: -69px 4px;}\
	span.gme-distance-container { display: none; }\
	span.gme-distance-container.show { display: inline-block; }\
	a.GME_info { background-position: -537px 4px;}\
	a.GME_info.gme-button-active {background-position: -540px 1px;}\
	a.GME_route { background-image: url(', markerIconSmall, '); background-position: center;}\
	.leaflet-control-zoomwarning { top: 94px; }\
	.leaflet-control-zoomwarning a { filter: progid:DXImageTransform.Microsoft.gradient(startColorStr="#BFC80000",EndColorStr="#BFC80000"); background-color:rgba(200,0,0,0.75); margin-left: -4px; background-position: -502px 2px;height:14px;width:14px; border-color: #b00; box-shadow: 0 0 8px rgba(0, 0, 0, 0.4); }\
	.leaflet-control-zoomwarning a:hover { background-color:rgba(230,0,0,0.75); }\
	a.gme-event { cursor: pointer; }\
	.gme-modalDialog {position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0,0,0,0.5); z-index: 1000; opacity:.5; -webkit-transition: opacity 400ms ease-in; -moz-transition: opacity 400ms ease-in; transition: opacity 400ms ease-in; pointer-events: none; display:none; }\
	.gme-modalDialog:target, .gme-modalDialog.gme-targetted { opacity:1; display:block; pointer-events: auto; }\
	.gme-modalDialog > div { position: relative; margin: 4% 12.5%; height: 30em; max-height: 75%; padding: 0 0 13px 0; border: 1px solid #000; border-radius: 10px; background: #fff; background: -moz-linear-gradient(#fff, #999); background: -webkit-linear-gradient(#fff, #999); background: -o-linear-gradient(#fff, #999); }\
	.gme-modalDialog header { color: #eee; background: none #454545; font-size: 15px; text-align: center; border-top-left-radius: 10px; padding: 0.5em 0; font-weight: bold; text-shadow: none; height: auto; min-height: auto; min-width: auto; }\
	.gme-modal-content { position: absolute; top: 3.5em; left: 0.75em; right: 0.75em; bottom: 0.5em; overflow: auto; }\
	.gme-modal-content > .leaflet-control-gme { position: absolute; left: 0.5em; bottom: 0.5em; top: auto; }\
	.gme-close-dialog { background: #606061; color: #fff; line-height: 25px; position: absolute; right: -12px; text-align: center; top: -10px; width: 24px; text-decoration: none; font-weight: bold; -webkit-border-radius: 12px; -moz-border-radius: 12px; border-radius: 12px; -moz-box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; box-shadow: 1px 1px 3px #000; }\
	.gme-close-dialog:hover { background: #00d9ff; }\
	#searchtabs li a { padding: 1em 0.5em; }\
	@media print { #search { display: none !important}}\
	.tab-switcher { position: relative; font-family: Arial, sans-serif; font-size: 14px; }\
	.gme-tab { float: left; }\
	.gme-tab-label { border-radius: 8px 8px 0 0; border: 1px solid #ccc; color: #454545; background: #ddd; display: block; position: relative; margin-left: 15px; padding: 3px 0; font-weight: bold; z-index: 0; }\
	.gme-tab-label:after { border-bottom: 1px solid #ccc; border-bottom-left-radius: 8px; border-left: 1px solid #ccc; box-shadow: -2px 2px 0 #ddd; bottom: -8px; content: ""; display: inline-block; height: 8px; left: 9px; position: relative; width: 8px; z-index: 3;}\
	.gme-tab-label:before { border-bottom: 1px solid #ccc; border-bottom-right-radius: 8px; border-right: 1px solid #ccc; box-shadow: 2px 2px 0 #ddd; bottom: -8px; content: ""; display: inline-block; height: 8px; left: -9px; position: relative; width: 8px; z-index: 3; }\
	.gme-tab-label:hover { cursor: pointer; }\
	.gme-tab-content { position: absolute; top: 25px; bottom: 3.5em; left: 0; right: 0; padding: 0.5em; background: #000; border: 1px solid #ccc; border-radius: 8px; color: #555; z-index: 1; opacity: 0; overflow: auto; }\
	.gme-tab-content ul { margin: 0.5em 0; }\
	.gme-tab input[type=radio] { display: none; }\
	.gme-tab input[type=radio]:checked ~ .gme-tab-content { z-index: 2; opacity: 1; background: #fff; color: #454545; }\
	.gme-tab input[type=radio]:checked ~ .gme-tab-label { background: #fff; color: #454545; border-bottom: 1px solid #fff; z-index: 3; }\
	.gme-tab input[type=radio]:checked ~ .gme-tab-label:after { box-shadow: -2px 2px 0 #fff; }\
	.gme-tab input[type=radio]:checked ~ .gme-tab-label:before { box-shadow: 2px 2px 0 #fff; }\
	.gme-fieldgroup { position: relative; border: 1px solid #ccc; border-radius: 6px; background: #eee; margin: 0.5em 0 1.5em; padding: 0.5em; }\
	.gme-fieldgroup h3 { position:absolute; top: -0.7em; left: 0.5em; padding: 0 0.5em; background: #eee; border-top: 1px solid #ccc; border-radius: 6px; z-index:1; display:inline-block; font-weight: bold; font-size: 12px; }\
	.gme-fieldgroup ul { margin: 0.5em 0; padding: 0; }\
	.gme-fieldgroup li { display: inline-block; margin: 0 -1px -1px 0; background: #ddd; border: 1px solid #ccc; border-radius: 6px; padding: 0 0.5em; }\
	.gme-xhair { cursor: crosshair; }\
	'].join("");

var GME_css_drag = '\
	#cacheDetails .cacheImage { border: solid 1px #ccc; border-radius: 7px; padding-left: 5px; }\
	.moveable { cursor: move; box-shadow: 0 1px 4px rgba(102, 51, 255, 0.3); }\
';

var GME_html_config = ['\
	<section class="gme-tab">\
		<input type="radio" name="gme-tab-row" id="gme-tab-maps" checked />\
		<label class="gme-tab-label" for="gme-tab-maps">Map display</label>\
		<div class="gme-tab-content">\
			<div class="gme-fieldgroup">\
				<h3>Maps to show in selector widget</h3>\
				<ul id="GME_mapfields"></ul>\
				<label>Default map source: &nbsp;<select name="GME_map_default" id="GME_map_default"></select></label>\
			</div>\
		</div>\
	</section>\
	<section class="gme-tab">\
		<input type="radio" name="gme-tab-row" id="gme-tab-manage" />\
		<label class="gme-tab-label" for="gme-tab-manage">Manage maps</label>\
		<div class="gme-tab-content">\
			<div class="gme-fieldgroup">\
				<h3>Add map sources</h3>\
				<label>Mapsource: <input type="text" name="GME_map_custom" id="GME_map_custom">&nbsp;</label>\
				<div class="leaflet-control-gme"><a id="GME_custom_add" class="gme-button gme-button-wide gme-button-l gme-button-r" title="Add custom map source">Add</a> <a href="#GME_format" title="Map source format info" class="gme-button gme-button-wide gme-button-l">Mapsource format info</a><a id="GME_custom_export" title="Export custom map source JSON" class="gme-button gme-button-wide gme-button-r">Export custom maps</a></div>\
			</div>\
			<div class="gme-fieldgroup">\
				<h3>Remove map sources</h3>\
				<ul id="GME_mapfields_del"></ul>\
			</div>\
		</div>\
	</section>\
	<section class="gme-tab">\
		<input type="radio" name="gme-tab-row" id="gme-tab-other" />\
		<label class="gme-tab-label" for="gme-tab-other">Other</label>\
		<div class="gme-tab-content">\
			<div class="gme-fieldgroup">\
				<h3>Miscellaneous settings</h3>\
				<ul>\
					<li><label title="Use new tabs for cache list and other websites"><input type="checkbox"', GME_parameters.useNewTab?' checked="checked"':'',' name="GME_useNewTab" id="GME_useNewTab" /> Use new tabs</label></li>\
					<li><label title="Only list unfound caches in search"><input type="checkbox"', GME_parameters.filterFinds?' checked="checked"':'',' name="GME_filterFinds" id="GME_filterFinds" /> Filter finds</label></li>\
					<li><label><input type="checkbox"', GME_parameters.osgbSearch?' checked="checked"':'',' name="GME_osgbSearch" id="GME_osgbSearch" /> Enhance search</label></li>\
					<li><label title="Location widget constantly updates position"><input type="checkbox"', GME_parameters.follow?' checked="checked"':'',' name="GME_follow" id="GME_follow" /> FollowMe Mode</label></li>\
				</ul>\
				<label>Labels:\
					<select name="GME_labelStyle" id="GME_labelStyle">\
						<option value="names"', GME_parameters.labels==='names'?' selected="selected"':'','>Names</option>\
						<option value="codes"', GME_parameters.labels==='codes'?' selected="selected"':'','>Codes</option>\
					</select>\
				</label>\
				<label>Scale:\
					<select name="GME_measure" id="GME_measure">\
						<option value="metric"', GME_parameters.measure==='metric'?' selected="selected"':'','>Metric</option>\
						<option value="imperial"', GME_parameters.measure==='imperial'?' selected="selected"':'','>Imperial</option>\
					</select>\
				</label>\
				<label>Map brightness:\
					<input type="range" name="GME_brightness" id="GME_brightness" value="',GME_parameters.brightness*100,'" min="0" max="100" />\
				</label>\
			</div>\
		</div>\
	</section>\
	<section class="gme-tab">\
		<input type="radio" name="gme-tab-row" id="gme-tab-about" />\
		<label class="gme-tab-label" for="gme-tab-about">About</label>\
		<div class="gme-tab-content">\
			<div class="gme-fieldgroup">\
				<h3>Geocaching Map Enhancements</h3><br />\
				<p>v', GME_parameters.version, ' &copy; 2011-2014 James Inge.	 Geocaching Map Enhancements is licensed for reuse under the <a target="_blank" href="http://www.opensource.org/licenses/mit-license.php">MIT License</a>. For documentation, see <a target="_blank" href="http://geo.inge.org.uk/gme.htm">http://geo.inge.org.uk/gme.htm</a></p>\
				<p>Elevation and reverse geocoding data provided by <a target="_blank" href="http://www.geonames.org/">GeoNames</a> and used under a <a target="_blank" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0</a> (CC-BY) License.</p>\
				<p>Grid reference manipulation is adapted from code &copy; 2005-2014 Chris Veness (<a target="_blank" href="http://www.movable-type.co.uk/scripts/latlong-gridref.html">www.movable-type.co.uk/scripts/latlong-gridref.html</a>, used under a <a target="_blank" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0</a> (CC-BY) License.</p>\
				<p>Photos provided by Panoramio and Geograph are copyright their respective owners - hover mouse over thumbnails or click through for attribution details. Geograph photos may be resused under a <a target="_blank" href="http://creativecommons.org/licenses/by-sa/2.0/">Creative Commons Attribution-ShareAlike 2.0</a> (CC-BY-SA) License.</p>\
			</div>\
		</div>\
	</section>\
	<div class="leaflet-control-gme">\
		<a href="#" class="gme-button gme-button-wide gme-button-l" rel="back" title="Cancel">Cancel</a><a href="#" class="gme-button gme-button-wide" id="GME_default" title="Reset to defaults">Defaults</a><a href="#" class="gme-button gme-button-wide gme-button-r" id="GME_set" title="Confirm settings">Save</a>\
	</div>\
'].join('');

var GME_html_custominfo = '\
	<p>Custom mapsources can be added by supplying entering a <a rel="external" href="http://www.json.org/">JSON</a> configuration string that tells GME what to call the map, where to find it, and how it is set up. e.g.</p>\
	<p><code>{"alt":"OS NPE (GB only)","tileUrl":"http://ooc.openstreetmap.org/npe/{z}/{x}/{y}.png", "minZoom":6, "maxZoom": 15, "attribution": "OpenStreetMap NPE" }</code></p>\
	<p>The <code>"alt"</code> and <code>"tileUrl"</code> parameters are mandatory. <code>"tileUrl"</code> can contain {x}, {y} and {z} for Google-style coordinate systems (also works with TMS systems like Eniro, but needs the <code>"scheme":"tms"</code> parameter), or {q} for Bing-style quadkeys. GME can also connect with WMS servers, in which case a <code>"layers"</code> parameter is required.</p>\
	<p>The other parameters are the same as those used by the <a rel="external" href="http://leaflet.cloudmade.com/reference.html#tilelayer">Leaflet API</a>, with the addition of a <code>"overlay":true</code> option, that makes the mapsource appear as a selectable overlay.</p>\
	<ul><li><a rel="external" href="http://geo.inge.org.uk/gme_config.htm">Detailed documentation</a></li><li><a rel="external" href="http://geo.inge.org.uk/gme_maps.htm">More mapsource examples</a></li></ul>\
';

var GME_html_search = '\
	<div class="SearchBox">\
		<input type="text" id="SearchBox_Text" />\
		<button id="SearchBox_OS" title="Search">Search</button>\
		<div class="GME_search_results hidden">\
			<h3 class="GME_search_heading">GeoNames search results</h3>\
			<ul class="GME_search_list"></ul>\
			<p>Or try the <a href="#" class="GME_link_GSSearch">Geocaching.com search</a>\
		</div>\
	</div>\
';

var GME_script_common = [
	'var that = this, callbackCount = 0, load_count = 0;\
	function checkAPI() {',
		GME_page_seek?
		'if(typeof $ === "function") {\
			load();':
		'if(typeof L === "object" && typeof $ === "function") {\
			extendLeaflet();\
			window.setTimeout(load,500);',
		'} else {\
			if(load_count < 60) {\
				window.setTimeout(checkAPI,1000);\
				load_count++;\
				log("Waiting for API to load: "+load_count+"...");\
			}\
		}\
		return;\
	}\
	function DMM(ll) {\
		var latDeg = ll.lat < 0 ? Math.ceil(ll.lat) : Math.floor(ll.lat),\
			lngDeg = ll.lng < 0 ? Math.ceil(ll.lng) : Math.floor(ll.lng);\
		return (ll.lat < 0 ? "S" : "N") + Math.abs(latDeg) + " " + (60 * Math.abs((ll.lat - latDeg))).toFixed(3) + (ll.lng < 0 ? " W" : " E") + Math.abs(lngDeg) + " " + (60 * Math.abs((ll.lng - lngDeg))).toFixed(3);\
	}\
	function formatDistance( dist ) {\
		var formatted = 0;\
		if( that.parameters.measure === "metric" ) {\
			if( dist > 10000 ) {\
				formatted = Math.round(dist/1000) + " km";\
			} else {\
				if( dist > 1000 ) {\
					formatted = (dist/1000).toFixed(1) + " km";\
				} else {\
					formatted = Math.round(dist)+" m";\
				}\
			}\
		} else {\
			if( dist > 16093.44 ) {\
				formatted = Math.round(dist/1609.344) + " mi";\
			} else {\
				if( dist > 1609.344 ) {\
					formatted = (dist/1609.344).toFixed(1) + " mi";\
				} else {\
					formatted = Math.round(dist * 3.2808)+" ft";\
				}\
			}\
		}\
		return( formatted );\
	}\
	function htmlEntities( text ) {\
		return text\
			.replace(/&/g, "&amp;")\
			.replace(/\\"/g, "&quot;")\
			.replace(/\'/g, "&apos;")\
			.replace(/</g, "&lt;")\
			.replace(/>/g, "&gt;");\
	}\
	function log( text ) {',
		(debug && GME_capabilities.log )?'console.log("GME: " + text);':'',
	'}\
	function validCoords( c1, c2 ) {\
		var lat, lng;\
		if (c1 === undefined) {\
			return false;\
		}\
		if (c1.hasOwnProperty("lat") && c1.hasOwnProperty("lng")) {\
			lat = c1.lat;\
			lng = c1.lng;\
		} else {\
			if( c2 !== undefined ) {\
				lat = c1;\
				lng = c2;\
			}\
		}\
		if( lat !== null && lng !== null && !isNaN(+lat) && !isNaN(+lng) && lat >= -90 && lat <= 90 ) {\
			return true;\
		}\
		return false;\
	}\
	function parseCoords(text) {\
		var lat=0, lng=0, num=0,\
		c = text.replace(/[^\\-SsWw0-9\\.\\s]/g," ").trim().match(/^([S\\-])?\\s*(\\d{1,2}(\\.\\d*){0,1}|\\.\\d*)(\\s+(\\d{0,2}(\\.\\d*){0,1})){0,1}(\\s+(\\d{0,2}(\\.\\d*){0,1})){0,1}\\s*([S\\-])?\\s+([W\\-])?\\s*(\\d{1,3}(\\.\\d*){0,1}|\\.\\d*)(\\s+(\\d{0,2}(\\.\\d*){0,1})){0,1}(\\s+(\\d{0,2}(\\.\\d*){0,1})){0,1}\\s*([W\\-])?$/i);\
		if( c ) {\
			num = (c[2]?1:0) + (c[5]?1:0) + (c[8]?1:0) + (c[12]?1:0) + (c[15]?1:0) + (c[18]?1:0);\
			switch(num) {\
				case 6:\
					break;\
				case 4:\
					if( c[15] === undefined ) { c[15] = c[12]; c[12] = c[8]; c[8] = undefined; }\
					break;\
				case 2:\
					if( c[12] === undefined && c[5] ) { c[12] = c[5]; c[5] = undefined; }\
					break;\
				default:\
					alert("Couldnt understand coordinates");\
					return false;\
			}\
			if( c[2] !== undefined ) { lat = +c[2]; }\
			if( c[5] !== undefined ) { lat += c[5]/60; }\
			if( c[8] !== undefined ) { lat += c[8]/3600; }\
			if( c[1] !== undefined || c[10] !== undefined ) { lat *= -1; }\
			if( c[12] !== undefined ) { lng = +c[12]; }\
			if( c[15] !== undefined ) { lng += c[15]/60; }\
			if( c[18] !== undefined ) { lng += c[18]/3600; }\
			if( c[11] !== undefined || c[20] !== undefined ) { lng *= -1; }\
		}\
		if( validCoords(lat, lng) ) {\
			return {lat:lat,lng:lng};\
		} else {\
			alert("Invalid coordinates");\
			return false;\
		}\
	}\
	function getHomeCoords() {\
		if (window.MapSettings !== undefined && MapSettings.User !== undefined && validCoords(MapSettings.User.Home)) {\
			return new L.LatLng(MapSettings.User.Home.lat, MapSettings.User.Home.lng);\
		}\
		if (validCoords(window.homeLat, window.homeLon)) {\
			return new L.LatLng(window.homeLat, window.homeLon);\
		}\
		var c, coords, h = $("#ctl00_ContentBody_lnkPrintDirectionsSimple").attr("href");\
		if(h !== undefined ) {\
			c = h.match(/(?:saddr=)(-?\\d{1,2}\\.\\d*),(-?\\d{1,3}\\.\\d*)/);\
			if( c !== null && c.length === 3 && validCoords( c[1], c[2] )) {\
				return new L.LatLng( c[1], c[2] );\
			}\
		}\
	}\
	function validURL( url ) {\
		return (/^(http|https|ftp)\\:\\/\\/([a-zA-Z0-9\\.\\-]+(\\:[a-zA-Z0-9\\.&amp;%\\$\\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\\-]+\\.)*[a-zA-Z0-9\\-]+\\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\\:[0-9]+)*(\\/($|[a-zA-Z0-9\\.\\,\\?\\\'\\\\\\+&amp;%\\$#\\=~_\\-]+))*$/).test(url);\
	}\
	function JSONP( url, id ) {\
		if(validURL(url)) {\
			var s=document.createElement("script");\
			s.type="text/javascript";\
			if(id) { s.id=id; }\
			s.src=url;\
			document.documentElement.firstChild.appendChild(s);\
		}\
	}\
	var userStatus = {\
		loggedin:',GME_capabilities.loggedin,',\
		home: getHomeCoords()\
	};\
	this.parameters=',JSON.stringify(GME_parameters),';\
	this.getVersion = function() { return this.parameters.version; };\
	this.getGeograph = function(coords) {\
		var that = this,\
		callprefix="GME_geograph_callback", call, host = "";\
		function searchLink(coords) {\
			if(coords === undefined) { return false; }\
			var host="";\
			if(bounds_GB.contains(coords) || bounds_IE.contains(coords)) {\
				host="http://geograph.org.uk/";\
			}\
			if(bounds_CI.contains(coords)) {\
				host="http://channel-islands.geographs.org/";\
			}\
			if(bounds_DE.contains(coords)) {\
				host="http://geo-en.hlipp.de/";\
			}\
			return host?[host,"search.php?location=", coords.toUrl()].join(""):false;\
		}\
		function makeCallback(callname) { callbackCount++; return function(json) {\
			var html, i, p;\
			if(json.items && json.items.length>0) {\
				html = ["<h3>Geograph images near ", DMM(coords), "</h3><p>"].join("");\
				for( i=json.items.length-1;i>=0;i--) {\
					p = json.items[i];\
					html += ["<a ",that.parameters.useNewTab?"target=\'geograph\' ":"","href=\'",encodeURI(p.link),"\' style=\'margin-right:0.5em;\' title=\'", htmlEntities(p.title) + " by " + htmlEntities(p.author), "\'>",p.thumbTag,"</a>"].join("");\
				}\
				html += ["</p><p><a ",that.parameters.useNewTab?"target=\'geograph\' ":"","href=\'",searchLink(coords),"\'>Search for more photos nearby on Geograph</a></p><p style=\'font-size:90%;\'>Geograph photos are copyrighted by their owners and available under a <a href=\'http://creativecommons.org/licenses/by-sa/2.0/\'>Creative Commons licence</a>. Hover mouse over thumbnails for more details, or click through for full images.</p>"].join("");\
				$.fancybox(html);\
			} else {\
				$.fancybox(["<p>No photos found nearby. <a ",that.parameters.useNewTab?"target=\'geograph\' ":"","href=\'",searchLink(coords),"\'>Search on Geograph</a></p>"].join("") );\
			}\
			$("#"+callname).remove();\
			if( window[callname] !== undefined ) { delete window[callname]; }\
		};}\
		if(validCoords(coords) && this.isGeographAvailable(coords)) {\
			if(bounds_GB.contains(coords) || bounds_IE.contains(coords)) {\
				host="http://mobile.api.geograph.org.uk/";\
			}\
			if(bounds_CI.contains(coords)) {\
				host="http://channel-islands.geographs.org/";\
			}\
			if(bounds_DE.contains(coords)) {\
				host="http://geo-en.hlipp.de/";\
				if( that.parameters.useNewTab ) {\
					window.open( searchLink(coords), "geograph" );\
				} else {\
					document.location = searchLink(coords);\
				}\
			}\
			call = callprefix + callbackCount;\
			window[call] = makeCallback(call);\
			JSONP( [host,"syndicator.php?key=geo.inge.org.uk&location=", coords.lat,",",coords.lng,"&format=JSON&callback=",call].join(""), call );\
		} else {\
			log("Bad coordinates to getGeograph");\
		}\
	};\
	this.getHeight = function(coords) {\
		var that = this, callprefix="GME_height_callback",call;\
		function makeCallback(callname) { callbackCount++; return function (json) {\
			if(typeof json.astergdem === "number" && typeof json.lat === "number" && typeof json.lng === "number") {\
				var h, m;\
				if( json.astergdem === -9999 ) {\
					m = "<p><strong>Spot Height</strong><br/>(Ocean)</p>";\
				} else {\
					h = that.parameters.measure==="metric"?json.astergdem+" m":Math.round(json.astergdem*3.2808)+" ft";\
					m = ["<p><strong>Spot Height</strong><br/>Approx ",h," above sea level</p>"].join("");\
				}\
				$.fancybox(m);\
			}\
			$("#"+callname).remove();\
			if( window[callname] !== undefined ) { delete window[callname]; }\
		};}\
		if(validCoords(coords)) {\
			call = callprefix + callbackCount;\
			window[call] = makeCallback(call);\
			JSONP( ["http://api.geonames.org/astergdemJSON?lat=",coords.lat,"&lng=",coords.lng,"&username=gme&callback=",call].join(""), call );\
		} else {\
			log("Bad coordinates to getHeight");\
		}\
	};\
	this.getPanoramio = function(bounds, zoom) {\
		var that = this, callprefix="GME_panoramio_callback", call;\
		zoom = zoom || 15;\
		function makeCallback(callname,z) { callbackCount++; return function (json) {\
			$("#GME_panoramio_callback").remove();\
			var i, html, p, searchlink = ["<a ",that.parameters.useNewTab?"target=\'panoramio\' ":"","href=\'http://www.panoramio.com/map/#lt=",bounds.getCenter().lat,"&ln=",bounds.getCenter().lng,"&z=",17-z,"&k=0\'>"].join(""), logo = "<img src=\'http://www.panoramio.com/img/logo-tos.png\' height=\'14\' width=\'67\' style=\'vertical-align: text-top;\' />";\
			if(json.photos && json.count) {\
				html = ["<p><a href=\'http://www.panoramio.com\' target=\'Panoramio\'>",logo,"</a> - Selected Panoramio photos from the map area.</p><p>"].join("");\
				for( i=json.photos.length-1;i>=0;i--) {\
					p = json.photos[i];\
					html += ["<a ",that.parameters.useNewTab?"target=\'panoramio\' ":"","href=\'",encodeURI(p.photo_url),"\' style=\'margin-right:0.5em;\' title=\'",htmlEntities(p.photo_title + " by " + p.owner_name), "\'><img src=\'",encodeURI(p.photo_file_url),"\' height=\'",p.height,"\' width=\'", p.width, "\' alt=\'",htmlEntities(p.photo_title + " by " + p.owner_name), "\' /></a>"].join("");\
				}\
				html += ["</p><p style=\'font-size:90%;\'><a href=\'http://www.panoramio.com\' target=\'Panoramio\'>",logo,"</a> Photos provided by Panoramio are under the copyright of their owners.</p><p>",searchlink,json.count>20?json.count+" photos in":"Search for photos near"," this area on Panoramio.com</a>"].join("");\
				$.fancybox(html);\
			} else {\
				$.fancybox(["No photos found in map area. ",searchlink,"Search on ", logo, "</a>"].join("") );\
			}\
			$("#"+callname).remove();\
			if( window[callname] !== undefined ) { delete window[callname]; }\
		};}\
		call = callprefix + callbackCount;\
		window[call] = makeCallback(call,zoom);\
		JSONP(["http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20&minx=", bounds.getSouthWest().lng,"&miny=",bounds.getSouthWest().lat,"&maxx=",bounds.getNorthEast().lng,"&maxy=",bounds.getNorthEast().lat,"&size=square&callback=",call].join(""), call);\
	};\
	this.isGeographAvailable = function(coords) {\
		return	bounds_GB.contains(coords) || bounds_IE.contains(coords) || bounds_CI.contains(coords) || bounds_DE.contains(coords);\
	};\
	this.isMAGICAvailable = function( coords ) {\
		return bounds_GB.contains(coords) || bounds_NI.contains(coords);\
	};',
	GME_capabilities.geolocation?'\
		this.seekHere = function() {\
			function hereCallback(pos) {\
				that.seekByLatLng( {lat:pos.coords.latitude, lng:pos.coords.longitude} );\
				$("#GME_hereSub").val("Go");\
			}\
			function hereError(err) {\
				if (err.code === 2) {\
					alert("Current location not available");\
				}\
				if (err.code === 3) {\
					alert("Timed out finding current location");\
				}\
				$("#GME_hereSub").val("Go");\
			}\
			$("#GME_hereSub").val("Waiting for location...");\
			navigator.geolocation.getCurrentPosition(hereCallback, hereError, {timeout: 60000, maximumAge: 30000});\
			return false;\
		};\
	':'',
	'this.seekByLatLng = function( latlng ) {\
		if( validCoords( latlng ) ) {\
			var url = ["http://www.geocaching.com/seek/nearest.aspx?origin_lat=",latlng.lat,"&origin_long=",latlng.lng, that.parameters.filterFinds?"&f=1":""].join("");\
			if( that.parameters.useNewTab ) {\
				window.open( url, "searchPage" );\
			} else {\
				document.location = url;\
			}\
		} else {\
			log( "Invalid coordinates for search" );\
		}\
	};'
].join("");

var GME_script_config = ['\
	function addSources(json){\
		function setSrc( src ) {\
			if( src.alt && src.tileUrl ) {\
				var m = that.parameters.maps.concat(src);\
				that.parameters.maps = m;\
				return 1;\
			}\
			alert("Map source must include at least \\"alt\\" and \\"tileUrl\\" parameters");\
			return 0;\
		}\
		var i,updated=0;\
		if( json.length === undefined) {\
			updated += setSrc(json);\
		} else {\
			for(i=0; i<json.length; i++) {\
				updated += setSrc(json[i]);\
			}\
		}\
		if( updated > 0 ) {\
			setConfig();\
			$("#gme-tab-maps")[0].checked = true;\
		}\
	}\
	function addCustom(){\
		try{\
			var n = JSON.parse(document.getElementById("GME_map_custom").value);\
			addSources(n);\
		} catch(e) {\
			alert("Map source string must be valid JSON.");\
			return;\
		}\
	}\
	function exportCustom(){\
		$.fancybox($("<p/>").text(JSON.stringify(that.parameters.maps)).html());\
	}\
	function setDefault(){\
		if(localStorage.GME_custom) { delete localStorage.GME_custom; }\
		if(localStorage.GME_parameters) { delete localStorage.GME_parameters; }\
		if(localStorage.GME_cache) { delete localStorage.GME_cache; }\
		refresh();\
	}\
	function refresh() {',
		GME_page_maps?
			'var uri = $("#map_linkto").val();\
			if( uri ) {\
				document.location = uri.replace(/^http:\\/\\/coord.info\\/map/,"http://www.geocaching.com/map/#");\
			} else {\
				document.location = "http://www.geocaching.com/map/";\
			}'
		:
			'document.location.hash = "";',
		'window.location.reload(false);\
		return false;\
	}\
	function setConfig() {\
		var i, mapfields = "", mapfields_del = "", mapselect = "", alt="", overlay, sel, allMaps=that.parameters.maps;\
		for( i=0;i<allMaps.length;i++) {\
			alt = allMaps[i].alt;\
			overlay=allMaps[i].overlay;\
			if(!overlay) { mapselect += ["<option value=\'",htmlEntities(alt),"\'>",htmlEntities(alt),"</option>"].join(""); }\
			mapfields += ["<li><label><input type=\'checkbox\' ",allMaps[i].ignore?"":"checked=\'checked\' ","name=\'",htmlEntities(alt),"\' id=\'checkbox-",i,"\' /> ",htmlEntities(alt),overlay?" (Overlay)":"","</label></li>"].join("");\
		}\
		if( allMaps.length > 0 ) {\
			for( i=0;i<allMaps.length;i++) {\
				alt = allMaps[i].alt;\
				mapfields_del += ["<li><label><input type=\'checkbox\' name=\'",htmlEntities(alt),"\' id=\'checkbox-del-",i,"\' /> ",htmlEntities(alt),allMaps[i].overlay?" (Overlay)":"","</label></li>"].join("");\
			}\
		} else {\
			mapfields_del = "&lt; No custom maps installed &gt;";\
		}\
		$("#GME_mapfields").html(mapfields);\
		$("#GME_mapfields_del").html(mapfields_del);\
		$("#GME_map_default").html(mapselect);\
		sel = $("#GME_map_default").children();\
		for(i=sel.length-1;i>-1;i--) {\
			if( sel[i].value === that.parameters.defaultMap ) {\
				sel[i].selected = "selected";\
			}\
		}\
	}\
	function storeSettings(){\
		var i, j, list;\
		that.parameters.defaultMap = $("#GME_map_default")[0].value;\
		list = $("#GME_mapfields input");\
		for( i=list.length-1;i>=0; i-- ) {\
			for( j=that.parameters.maps.length-1;j>=0; j-- ) {\
				if( that.parameters.maps[j].alt === list[i].name ) {\
					that.parameters.maps[j].ignore = !list[i].checked;\
				}\
			}\
		}\
		for( j=that.parameters.maps.length-1;j>=0; j-- ) {\
			if( that.parameters.maps[j].alt === that.parameters.defaultMap ) {\
				that.parameters.maps[j].ignore = false;\
			}\
		}\
		list = $("#GME_mapfields_del input");\
		for (i=list.length-1;i>=0; i--) {\
			if (list[i].checked === true) {\
				for (j=that.parameters.maps.length-1;j>=0; j--) {\
					if (that.parameters.maps[j].alt === list[i].name) {\
						that.parameters.maps.splice(j,1);\
						break;\
					}\
				}\
			}\
		}\
		that.parameters.brightness = $("#GME_brightness").val()/100;\
		that.parameters.filterFinds = $("#GME_filterFinds")[0].checked?true:false;\
		that.parameters.follow = $("#GME_follow")[0].checked?true:false;\
		that.parameters.labels = $("#GME_labelStyle")[0].value;\
		that.parameters.measure = $("#GME_measure")[0].value;\
		that.parameters.osgbSearch = $("#GME_osgbSearch")[0].checked?true:false;\
		that.parameters.useNewTab = $("#GME_useNewTab")[0].checked?true:false;\
		localStorage.setItem("GME_parameters",JSON.stringify(that.parameters));\
		refresh();\
	}\
	setConfig();\
	$("#GME_set").bind("click", storeSettings);\
	$("#GME_default").bind("click", setDefault);\
	$("#GME_custom_add").bind("click", addCustom);\
	$("#GME_custom_export").bind("click", exportCustom);',
	!GME_page_maps?'$("#ctl00_liNavProfile .SubMenu").append("<li><a id=\'gme-config-link\' href=\'#GME_config\' title=\'Configure Geocaching Map Enhancements extension\'>Geocaching Map Enhancements</a></li>");':''
].join('');

var GME_script_dist = GME_capabilities.geolocation?['\
	$("#lblDistFromHome").parent().append("<br/><span id=\'gme-dist\'><a href=\'#\' id=\'gme-dist-link\'>Check distance from here</a></span>");\
	$("#gme-dist-link").click(function () {\
		var there = new LatLon( mapLatLng.lat, mapLatLng.lng ),\
		rose = [[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5],["N","NE","E","SE","S","SW","W","NW"]],\
		watcher;\
		function found(pos) {\
			var here = new LatLon( pos.coords.latitude, pos.coords.longitude ),\
			bearing = here.bearingTo(there),\
			dir = "N", i;\
			for(i=0;i<8;i++) {\
				if(bearing < rose[0][i] ) {\
					dir = rose[1][i];\
					break;\
				}\
			}\
			$("#gme-dist").html( ["<img style=\'vertical-align:text-bottom\' alt=\'", dir, "\' src=\'/images/icons/compass/", dir, ".gif\'> ", dir, " ", formatDistance(here.distanceTo(there)*1000), " from here at bearing ", Math.round(bearing),"&deg;"].join("") );\
		}\
		function lost() {\
			if(watcher) {\
				navigator.geolocation.clearWatch(watcher);\
			}\
			alert("GME couldn\'t detect your location.\\nDisable FollowMe mode in Geocaching Map Enhancements if this error pops up repeatedly.");\
		}',
		GME_parameters.follow?
			'watcher = navigator.geolocation.watchPosition(found, lost, {timeout: 60000, maximumAge: 30000});':
			'navigator.geolocation.getCurrentPosition(found, lost, {timeout: 60000, maximumAge: 30000});',
		'return false;\
	});\
'].join(''):'';

var GME_script_drag = GME_capabilities.dragdrop?'\
	this.dragStart = function (event) {\
		function GME_formatLOC( wpts ) {\
			return wpts?["<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>\\n<loc version=\\"1.0\\" src=\\"Geocaching Map Enhancements\\">",wpts.join("\\n"),"</loc>"].join("\\n"):null;\
		}\
		function GME_formatLOC_wpt( id, desc, coords, type, link) {\
			if( id && desc && coords ) {\
				var t="Geocache";\
				var l=link?["\\n\\t<link text=\\"",link.desc,"\\">",link.href,"</link>"].join(""):"";\
				switch(type) {\
					case "Original Coordinates": t=type; break;\
					case 217: t="Parking Area"; break;\
					case 218: t="Question to Answer"; break;\
					case 219: t="Stages of a Multicache"; break;\
					case 220: t="Final Location"; break;\
					case 221: t="Trailhead"; break;\
					case 452: t="Reference Point"; break;\
				}\
				return ["<waypoint>\\n\\t<name id=\\"", id, "\\"><![CDATA[", desc, "]]></name>\\n\\t<coord lat=\\"", coords.lat, "\\" lon=\\"", coords.lng, "\\"/>\\n\\t<type>",t,"</type>",l,"\\n</waypoint>"].join("");\
			}\
			log(["Missing cache data - id: ",id," desc: ", desc," coords: ", coords].join(""));\
			return null;\
		}\
		var c, i, id = $("#ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode")[0].innerHTML,\
		loc = [GME_formatLOC_wpt(id, cache_coords.primary[0].name, cache_coords.primary[0], cache_coords.primary[0].type,{desc:"Cache Details",href:"http://coord.info/"+id})];\
		for( i = cache_coords.additional.length-1; i >= 0; i-- ) {\
			c = cache_coords.additional[i];\
			loc.push(GME_formatLOC_wpt(c.pf + id.slice(2), [c.name,$("#awpt_"+c.pf).parent().parent().next().children()[2].innerHTML.trim()].join(" "), c, c.type, {desc:"Waypoint details", href:$("#awpt_"+c.pf).parent().next().next().children().attr("href").match(/(.*?)&RefID/)[1]} ));\
		}\
		if( cache_coords.primary[0].isUserDefined ) {\
			loc.push(GME_formatLOC_wpt("GO"+id.slice(2), cache_coords.primary[0].name, {lat:cache_coords.primary[0].oldLatLng[0], lng:cache_coords.primary[0].oldLatLng[1]}, "Original Coordinates",{desc:"Cache Details",href:"http://coord.info/"+id}));\
		}\
		var locfmt = GME_formatLOC( loc );\
		var dataURI = "data:application/xml-loc," + encodeURIComponent(locfmt);\
		var dt = event.originalEvent.dataTransfer;\
		if( window.DataTransfer !== undefined && dt.constructor === DataTransfer) {\
			dt.setData("application/gme-cache-coords",JSON.stringify(cache_coords));\
			dt.setData("application/xml-loc", locfmt);\
			dt.setData("text/x-moz-url",dataURI+"\\nGME_waypoints.loc");\
			dt.setData("DownloadURL","application/xml-loc:GME_waypoints.loc:"+dataURI);\
		}\
		dt.setData("text/uri-list",dataURI);\
		dt.setData("Text",locfmt);\
		dt.effectAllowed="copy";\
		dt.setDragImage($("a[title=\'About Cache Types\'] img")[0],0,0);\
	};\
':'';

var GME_script_drop = GME_capabilities.dragdrop?'\
	$.fn.filterNode = function(name) { return this.find("*").filter(function () { return this.nodeName === name; });};\
	L.GME_dropHandler = L.Control.extend( {\
		onAdd:function (map) {\
			var container = $(map.getContainer());\
			this._map = map;\
			container.on("drop",this.drop(map));\
			container.on("dragover",this.dragOver);\
			return document.createElement("div");\
		},\
		onRemove:function (map) {\
			var container = $(map.getContainer());\
			container.off("drop",this.drop(map));\
			container.off("dragover",this.dragOver);\
		},\
		drop:function (map) { return function (e) {\
			function typeToIcon(t) {\
				var j, type=t;\
				for( j = wptTypes.length - 1; j>=0; j-- ) {\
					type = type.replace(wptTypes[j][0],wptTypes[j][1]);\
				}\
				return type;\
			}\
			function parseLOC( text ) {\
				var i, l, w, t, len, lat, lng, name, points={primary:[], additional:[]}, wpts = $($.parseXML(text)).find("waypoint");\
				for(i=0,len=wpts.length;i<len;i++){\
					w=$(wpts[i]);\
					lat=w.find("coord").attr("lat");\
					lng=w.find("coord").attr("lon");\
					name=w.find("name").attr("id") + ": " + w.find("name").text().trim();\
					if(isNaN(+lat)||isNaN(+lng)||lat < -90||lat >90) { return false; }\
					t = w.find("type").text();\
					if(/Geocache/i.test(t)) {\
						points.primary.push({ lat:lat, lng:lng, name:name, type:2 });\
					} else {\
						l = points.primary.length;\
						if(l && /Original Coordinates/i.test(t)) {\
							points.primary[l-1].oldLatLng = [lat, lng];\
							points.primary[l-1].isUserDefined = true;\
						} else {\
							points.additional.push({ lat:lat, lng:lng, name:name, type:typeToIcon(t) });\
						}\
					}\
				}\
				return(points.additional.length + points.primary.length > 0)?points:false;\
			}\
			function readLOC(e) {\
				var data = e.target.result, pts = parseLOC( data );\
				if( pts ) {\
					log("Received LOC file");\
					GME_displayPoints(pts,map,"dragdrop");\
				}\
			}\
			function parseGPX( text ) {\
				var d, i, j, k, w, r, t, lat, lng, len, n, name="", poly, type, points={primary:[], additional:[], routes:[]}, gpx = $($.parseXML(text)), wpts = gpx.find("wpt"), tracks = gpx.find("trk"), segs, routes = gpx.find("rte");\
				for(i=0,len=wpts.length;i<len;i++){\
					w=$(wpts[i]);\
					lat=w.attr("lat");\
					lng=w.attr("lon");\
					n=w.filterNode("name");\
					d=w.filterNode("desc");\
					name=n.length>0?n[0].textContent:"Point "+i;\
					name+=(n.length>0&&d.length>0)?" : ":"";\
					name+=d.length>0?d[0].textContent:"";\
					if(isNaN(+lat)||isNaN(+lng)||lat < -90||lat >90) { return false;}\
					t = w.find("sym").text();\
					if( /Geocache/i.test(t) ) {\
						t = w.filterNode("groundspeak:type");\
						if( t.length > 0 ) {\
							type = t[0].textContent;\
						} else {\
							type = "Geocache";\
						}\
					} else {\
						type = t;\
					}\
					points[/Geocache/i.test(t)?"primary":"additional"].push({ lat:lat, lng:lng, name:name, type:typeToIcon(type) });\
				}\
				for(i=routes.length-1;i>=0;i--) {\
					poly = [];\
					r = $(routes[i]);\
					n=r.filterNode("name");\
					name=n.length>0?n[0].textContent:"Route "+i;\
					wpts = r.find("rtept");\
					for(j = wpts.length-1;j>=0;j--) {\
						w = $(wpts[j]);\
						poly.push( new L.LatLng(w.attr("lat"), w.attr("lon")));\
					}\
					points.routes.push({name:name, points:poly});\
				}\
				for(i=tracks.length-1;i>=0;i--) {\
					poly = [];\
					r = $(tracks[i]);\
					segs = r.find("trkseg");\
					for(j=segs.length-1;j>=0;j--) {\
						n = r.filterNode("name");\
						name =[(n.length>0)?n[0].textContent:"Track " + i, " segment ", j].join("");\
						wpts = $(segs[j]).find("trkpt");\
						for(k = wpts.length-1;k>=0;k--) {\
							w = $(wpts[k]);\
							poly.push( new L.LatLng(w.attr("lat"), w.attr("lon")));\
						}\
						points.routes.push({name:name, points:poly});\
					}\
				}\
				return(points.additional.length + points.primary.length + points.routes.length> 0)?points:false;\
			}\
			function readGPX(e) {\
				var data = e.target.result, pts = parseGPX( data );\
				if( pts ) {\
					log("Received GPX file");\
					GME_displayPoints(pts,map,"dragdrop");\
				}\
			}\
			e.stopPropagation();\
			e.preventDefault();\
			var i, data, dt=e.originalEvent.dataTransfer, file, files = dt.files, pts, reader;\
			try {\
				data = dt.getData("application/gme-cache-coords");\
				if(data) {\
					log("Received GME data");\
					GME_displayPoints(JSON.parse(data),map,"dragdrop");\
					return;\
				}\
				data = dt.getData("text/plain");\
				if(data) {\
					pts = parseLOC( data );\
					if( pts ) {\
						log("Received LOC text");\
						GME_displayPoints(pts,map,"dragdrop");\
						return;\
					}\
					pts = parseGPX( data );\
					if( pts ) {\
						log("Received GPX text");\
						GME_displayPoints(pts,map,"dragdrop");\
						return;\
					}\
				}\
			} catch(E) { log("Drop: " + E); }\
			for(i=files.length-1; i>=0; i--){\
				file = files[i];\
				if(/application\\/xml-loc/.test(file.type)||/\\.loc$/i.test(file.name)) {\
					reader = new FileReader();\
					reader.onload = readLOC;\
					reader.readAsText(file);\
				} else {\
					if(/application\\/xml-gpx/.test(file.type)||/\\.gpx$/i.test(file.name)) {\
						reader = new FileReader();\
						reader.onload = readGPX;\
						reader.readAsText(file);\
					} else {\
						log("Dropped file not recognised: " + file.name + ", (type: " + file.type + ")" );\
					}\
				}\
			}\
		};},\
		dragOver:function (e) {\
			var dt=e.originalEvent.dataTransfer;\
			function contains( array, value ) {\
				if( array.indexOf ) {\
					return array.indexOf(value) >= 0;\
				}\
			}\
			if( window.DataTransfer !== undefined && dt.constructor === DataTransfer) {\
				try {\
					if (dt.types.contains("application/gme-cache-coords") || dt.types.contains("application/xml-gpx") || dt.types.contains("application/xml-loc") || dt.types.contains("text/plain") || dt.types.contains("Files")){\
						e.preventDefault();\
						return false;\
					}\
				} catch(E) { log("dragover:types: " + E); }\
			} else {\
				if( window.Clipboard !== undefined && dt.constructor === Clipboard) {\
					if( contains(dt.types, "application/gme-cache-coords") || contains(dt.types,"application/xml-gpx") || contains(dt.types,"application/xml-loc") || contains(dt.types,"text/plain") || contains(dt.types,"Files")){\
						e.preventDefault();\
						return false;\
					}\
				}\
			}\
		}\
	});\
':'';

var GME_script_labels = ['\
	function GME_load_labels(control, div) {\
		function labelHandler() {\
			var action = this.getAttribute("data-gme-action"), cache = this.getAttribute("data-gme-cache");\
			if( action === "panTo" && control.labels.labels[cache] ) { control._map.panTo( control.labels.labels[cache][2] ); }\
			if( action === "refresh" ) { control.labels.refresh(); }\
			if( action === "clear" ) { control.labels.removeLabels(); }\
			if( action === "auto" ) { control.labels.toggleAuto(); }\
			if( action === "show" ) { control.labels.toggleShow(); }\
			return false;\
		}\
		L.GME_identifyLayer = L.Class.extend({\
			initialize: function (latlng, options) {\
				L.Util.setOptions(this, options);\
				this._latlng = latlng;\
			},\
			onAdd: function (map) {\
				this._map = map;\
				this._el = L.DomUtil.create("div", "gme-identify-layer leaflet-zoom-hide");\
				this._el.innerHTML = this.options.label;\
				this._el.title = this.options.desc;\
				this._el.style.position = "absolute";\
				map.getPanes().overlayPane.appendChild(this._el);\
				map.on("viewreset", this._reset, this);\
				this._reset();\
			},\
			onRemove: function (map) {\
				map.getPanes().overlayPane.removeChild(this._el);\
				map.off("viewreset", this._reset, this);\
			},\
			options: {\
				label: "Cache",\
				desc: "Long cache name"\
			},\
			setPosition: function (ll) {\
				this._latlng = ll;\
				this._reset();\
			},\
			_reset: function () {\
				if( this._map ) {\
					var pos = this._map.latLngToLayerPoint(this._latlng);\
					L.DomUtil.setPosition(this._el, pos);\
				}\
			}\
		});\
		control.labels = {\
			showLabels: false,\
			autoUpdate: false,\
			labels: {},\
			labelLayer: new L.LayerGroup(),\
			clearLabels:function () {\
				control._map.removeLayer( control.labels.labelLayer );\
			},\
			displayLabels:function () {\
				control._map.addLayer( control.labels.labelLayer );\
			},\
			refresh:function () {\
				if( !( MapSettings.MapLayers && MapSettings.MapLayers.UTFGrid )) {\
					return;\
				}\
				var i, coords, tiles = $(".leaflet-tile-pane .leaflet-layer img[src*=\'geocaching.com/map.png\']");\
				for( i = tiles.length-1; i>=0; i-- ) {\
					coords = tiles[i].src.match(/x=(\\d+)&y=(\\d+)&z=(\\d+)/);\
					if( coords && !([coords[3],coords[1],coords[2]].join("_") in MapSettings.MapLayers.UTFGrid._cache)) {\
						MapSettings.MapLayers.UTFGrid._loadTile(coords[3],coords[1],coords[2]);\
					}\
				}\
				setTimeout( control.labels.refreshLabels, 500 );\
			},\
			refreshLabels:function () {\
				var c, p, q, r, tile, tilepos, tileref, gridref, zoom = control._map.getZoom();\
				if( !( MapSettings.MapLayers && MapSettings.MapLayers.UTFGrid )) {\
					return;\
				}\
				for( p in MapSettings.MapLayers.UTFGrid._cache ) {\
					tileref = p.split("_");\
					if(tileref.length === 3) {\
						tile = $(["img[src*=\'x=", tileref[1], "&y=", tileref[2], "&z=", tileref[0], "\']"].join(""))[0];\
						if(tile) {\
							tilepos = L.DomUtil.getPosition( tile );\
							if( MapSettings.MapLayers.UTFGrid._cache[p] ) {\
								for( q in MapSettings.MapLayers.UTFGrid._cache[p].data ) {\
									for( r in MapSettings.MapLayers.UTFGrid._cache[p].data[q] ) {\
										c = MapSettings.MapLayers.UTFGrid._cache[p].data[q][r];\
										if(!control.labels.labels[c.i]) {\
											gridref = q.match(/\\((\\d+), (\\d+)\\)/);\
											if( gridref ) {\
												control.labels.labels[c.i] = [ c.i, c.n, control._map.layerPointToLatLng(tilepos.add(new L.Point( 4*gridref[1], 4*gridref[2]))), zoom];\
												control.labels.labels[c.i][4] = new L.GME_identifyLayer(control.labels.labels[c.i][2], {', GME_parameters.labels==='names'?'label:c.n, desc:c.i':'label:c.i, desc:c.n','});\
											}\
										} else {\
											if( zoom > control.labels.labels[c.i][3] ) {\
												gridref = q.match(/\\((\\d+), (\\d+)\\)/);\
												if( gridref ) {\
													control.labels.labels[c.i][2] = control._map.layerPointToLatLng(tilepos.add(new L.Point( 4*gridref[1], 4*gridref[2])));\
													control.labels.labels[c.i][3] = zoom;\
													control.labels.labels[c.i][4].setPosition( control.labels.labels[c.i][2] );\
												}\
											}\
										}\
										control.labels.labelLayer.addLayer( control.labels.labels[c.i][4] );\
									}\
								}\
							}\
						}\
					}\
				}\
				control.labels.updateCachePanel();\
				if( control.labels.showLabels ) {\
					control.labels.clearLabels();\
					control.labels.displayLabels();\
				}\
			},\
			removeLabels:function () {\
				$("#gme_cachelist").html("");\
				control.labels.labelLayer.clearLayers();\
				control.labels.labels = {};\
			},\
			toggleAuto:function () {\
				if( control.labels.autoUpdate ) {\
					control.labels.autoUpdate = false;\
					control._map.off("moveend",control.labels.refresh);\
					$(".gme-button-labels-auto").removeClass("gme-button-active");\
				} else {\
					control.labels.autoUpdate = true;\
					$(".gme-button-labels-auto").addClass("gme-button-active");\
					control._map.on("moveend",control.labels.refresh);\
					control.labels.refresh();\
				}\
			},\
			toggleShow:function () {\
				if( control.labels.showLabels ) {\
					control.labels.showLabels = false;\
					$(".gme-button-labels-show").removeClass("gme-button-active");\
					control.labels.clearLabels();\
				} else {\
					control.labels.showLabels = true;\
					$(".gme-button-labels-show").addClass("gme-button-active");\
					control.labels.refresh();\
				}\
			},\
			updateCachePanel:function () {\
				var i, j, sortorder =[], html = "";\
				for( i in control.labels.labels ) {\
					sortorder.push(i);\
				}\
				sortorder.sort();\
				j = sortorder.length;\
				for( i =0; i<j; i++ ) {\
					html += ["<tr><td><a href=\'http://coord.info/",sortorder[i],"\' target=\'_blank\'>",control.labels.labels[sortorder[i]][1],"</a></td><td class=\'gme-cache-code\'>&nbsp;",sortorder[i],"</td><td><a class=\'gme-event\' title=\'Pan map to cache location\' data-gme-action=\'panTo\' data-gme-cache=\'",sortorder[i],"\'><img src=\'../images/silk/map.png\' width=\'16\' height=\'16\' alt=\'Pan\' /></a></td></tr>"].join("");\
				}\
				$("#gme_cachelist").html(html);\
			}\
		};\
		$("#searchtabs ul").append("<li id=\'gme_caches_button\'><a href=\'#gme_caches\' title=\'GME Cache Label List\' id=\'gme_caches_link\'>GME</a></li>");\
		$("#searchtabs li").css("width", 100/$("#searchtabs li").length+"%");\
		$("#pqlink").html("PQs");\
		$("#clistButton").html("GCVote");\
		document.getElementById("pqlink").innerHTML = "PQs";\
		$(div).append("<div id=\'gme_caches\'>\
			<div class=\'leaflet-control-gme\'>\
				<a title=\'Refresh cache labels\' class=\'gme-event gme-button-refresh-labels gme-button gme-button-l\' data-gme-action=\'refresh\'></a><a title=\'Empty cache list and remove labels from map\' class=\'gme-event gme-button gme-button-clear-labels\' data-gme-action=\'clear\'></a><a class=\'gme-event gme-button gme-button-wide gme-button-labels-show\' data-gme-action=\'show\'>Show labels</a><a class=\'gme-event gme-button gme-button-r gme-button-wide gme-button-labels-auto\' data-gme-action=\'auto\'>Auto update</a>\
			</div>\
			<table><tbody id=\'gme_cachelist\'><tr><td colspan=\'3\'>Hit the refresh button above to populate the list.</td></tr></tbody></table></div>");\
		$("#gme_caches").css("display","none").on("click", ".gme-event", labelHandler);\
		$("#gme-labels-show").on("change", control.labels.toggleShow );\
		$("#gme-labels-auto").on("change", control.labels.toggleAuto );\
	}\
'].join('');

var GME_script_osgb = '\
	function OSGridToLatLng(E,N) {\
		var a, b, F0, lat, lon, lat0, lon0, N0, E0, e2, n, n2, n3, M, Ma, Mb, Mc, Md, cosLat, sinLat, nu, nu3, nu5, nu7, rho, eta2, tanLat, tan2lat, tan4lat, tan6lat, secLat, VII, VIII, IX, X, XI, XII, XIIA, dE, dE2, dE3, dE4, dE5, dE6, dE7, tx, ty, tz, rx, ry, rz, s1, sinPhi, cosPhi, sinLambda, cosLambda, eSq, nu2, x1, y1, z1, x2, y2, z2, p, phi, phiP, precision, lambda;\
		a = 6377563.396;\
		b = 6356256.910;\
		F0 = 0.9996012717;\
		lat0 = 49*Math.PI/180;\
		lon0 = -2*Math.PI/180;\
		N0 = -100000;\
		E0 = 400000;\
		e2 = 1 - (b*b)/(a*a);\
		n = (a-b)/(a+b);\
		n2 = n*n;\
		n3 = n*n*n;\
		lat=lat0;\
		M=0;\
		do {\
			lat = (N-N0-M)/(a*F0) + lat;\
			Ma = (1 + n + (5/4)*n2 + (5/4)*n3) * (lat-lat0);\
			Mb = (3*n + 3*n*n + (21/8)*n3) * Math.sin(lat-lat0) * Math.cos(lat+lat0);\
			Mc = ((15/8)*n2 + (15/8)*n3) * Math.sin(2*(lat-lat0)) * Math.cos(2*(lat+lat0));\
			Md = (35/24)*n3 * Math.sin(3*(lat-lat0)) * Math.cos(3*(lat+lat0));\
			M = b * F0 * (Ma - Mb + Mc - Md);\
		} while (N-N0-M >= 0.01);\
		cosLat = Math.cos(lat);\
		sinLat = Math.sin(lat);\
		nu = a*F0/Math.sqrt(1-e2*sinLat*sinLat);\
		rho = a*F0*(1-e2)/Math.pow(1-e2*sinLat*sinLat, 1.5);\
		eta2 = nu/rho-1;\
		tanLat = Math.tan(lat);\
		tan2lat = tanLat*tanLat;\
		tan4lat = tan2lat*tan2lat;\
		tan6lat = tan4lat*tan2lat;\
		secLat = 1/cosLat;\
		nu3 = nu*nu*nu;\
		nu5 = nu3*nu*nu;\
		nu7 = nu5*nu*nu;\
		VII = tanLat/(2*rho*nu);\
		VIII = tanLat/(24*rho*nu3)*(5+3*tan2lat+eta2-9*tan2lat*eta2);\
		IX = tanLat/(720*rho*nu5)*(61+90*tan2lat+45*tan4lat);\
		X = secLat/nu;\
		XI = secLat/(6*nu3)*(nu/rho+2*tan2lat);\
		XII = secLat/(120*nu5)*(5+28*tan2lat+24*tan4lat);\
		XIIA = secLat/(5040*nu7)*(61+662*tan2lat+1320*tan4lat+720*tan6lat);\
		dE = (E-E0);\
		dE2 = dE*dE;\
		dE3 = dE2*dE;\
		dE4 = dE2*dE2;\
		dE5 = dE3*dE2;\
		dE6 = dE4*dE2;\
		dE7 = dE5*dE2;\
		lat = lat - VII*dE2 + VIII*dE4 - IX*dE6;\
		lon = lon0 + X*dE - XI*dE3 + XII*dE5 - XIIA*dE7;\
		tx=446.448;\
		ty=-125.157;\
		tz=542.060;\
		rx=7.2819014902652306237205098174164e-7;\
		ry=1.1974897923405539041670878328241e-6;\
		rz=4.0826160086234026020206666559563e-6;\
		s1=0.9999795106;\
		sinPhi = Math.sin(lat);\
		cosPhi = Math.cos(lat);\
		sinLambda = Math.sin(lon);\
		cosLambda = Math.cos(lon);\
		eSq = (a*a - b*b) / (a*a);\
		nu2 = a / Math.sqrt(1 - eSq*sinPhi*sinPhi);\
		x1 = nu2 * cosPhi * cosLambda;\
		y1 = nu2 * cosPhi * sinLambda;\
		z1 = (1-eSq)*nu2 * sinPhi;\
		x2 = tx + x1*s1 - y1*rz + z1*ry;\
		y2 = ty + x1*rz + y1*s1 - z1*rx;\
		z2 = tz - x1*ry + y1*rx + z1*s1;\
		a = 6378137;\
		b = 6356752.3142;\
		eSq = (a*a - b*b) / (a*a);\
		p = Math.sqrt(x2*x2 + y2*y2);\
		phi = Math.atan2(z2, p*(1-eSq));\
		phiP = 2*Math.PI;\
		precision = 4 / a;\
		while (Math.abs(phi-phiP) > precision) {\
			nu = a / Math.sqrt(1 - eSq*Math.sin(phi)*Math.sin(phi));\
			phiP = phi;\
			phi = Math.atan2(z2 + eSq*nu*Math.sin(phi), p);\
		}\
		lambda = Math.atan2(y2, x2);\
		return {lat: phi*180/Math.PI, lng:lambda*180/Math.PI};\
	}\
	function gridrefLetToNum(letters, numbers) {\
		letters = letters.toUpperCase();\
		var e, n, l1 = letters.charCodeAt(0) - "A".charCodeAt(0),\
		l2 = letters.charCodeAt(1) - "A".charCodeAt(0);\
		if (l1 > 7) { l1--; }\
		if (l2 > 7) { l2--; }\
		e = ((l1-2)%5)*5 + (l2%5);\
		n = (19-Math.floor(l1/5)*5) - Math.floor(l2/5);\
		e += numbers.slice(0, numbers.length/2);\
		n += numbers.slice(numbers.length/2);\
		switch (numbers.length) {\
			case 2: e += "5000"; n += "5000"; break;\
			case 4: e += "500"; n += "500"; break;\
			case 6: e += "50"; n += "50"; break;\
			case 8: e += "5"; n += "5"; break;\
		}\
		return [e, n];\
	}\
	function parseGR(searchVal) {\
		var ngr, gr = searchVal.match(/^\\s*([hnstHNST][A-Ha-hJ-Zj-z])\\s*((?:\\d\\d){1,5})\\s*$/);\
		if( gr ) {\
			if(gr.length===3){\
				if(2* Math.floor(gr[2].length / 2 ) === gr[2].length){\
					ngr = gridrefLetToNum(gr[1], gr[2]);\
					return OSGridToLatLng(ngr[0], ngr[1]);\
				}\
			}\
			return null;\
		}\
		gr = searchVal.match(/^\\s*(\\d{3,6})\\s*,\\s*(\\d{4,7})\\s*$/);\
		if( gr ) {\
			if(gr.length===3){\
				return OSGridToLatLng(gr[1], gr[2]);\
			}\
		}\
		return null;\
	}\
';

// The script waits for the Leaflet API to load, and will abort if it does not find it after a minute.
var GME_script_map = [
	'var \
	bounds_GB = new L.LatLngBounds(new L.LatLng(49,-9.5),new L.LatLng(62,2.3)),\
	bounds_IE = new L.LatLngBounds(new L.LatLng(51.2,-12.2),new L.LatLng(55.73,-4.8)),\
	bounds_NI = new L.LatLngBounds(new L.LatLng(54,-8.25),new L.LatLng(55.73,-5.25)),\
	bounds_CI = new L.LatLngBounds(new L.LatLng(49.1,-2.8),new L.LatLng(49.8,-1.8)),\
	bounds_DE = new L.LatLngBounds(new L.LatLng(47.24941,5.95459),new L.LatLng(55.14121,14.89746)),\
	wptTypes = [[/Geocache/i,"2"],[/Traditional Cache/i,"2"],[/Multi-cache/i,"3"],[/Virtual Cache/i,"4"],[/Letterbox Hybrid/i,"5"],[/Event Cache/i,"6"],[/Unknown cache/i,"8"],[/Webcam Cache/i,"11"],[/Cache In Trash Out Event/i,"13"],[/Wherigo Cache/i,"1858"],[/Locationless \\(Reverse\\) Cache/i,"12"],[/Mega-Event Cache/i,"453"],[/GPS Adventures Exhibit/i,"1304"],[/Groundspeak Block Party/i,"4738"],[/Groundspeak HQ/i,"3773"],[/Groundspeak Lost and Found Celebration/i,"3774"],[/Lost and Found Event Cache/i,"3653"],[/Project APE Cache/i,"9"],[/Earthcache/i,"137"],[/Question to Answer/i,"218"],[/Parking Area/i,"217"],[/Stages of a Multicache/i,"219"],[/Final Location/i,"220"],[/Trailhead/i,"221"],[/Reference Point/i,"452"]];\
	function GME_displayPoints(plist, map, context) {\
		var bounds, i, p, layers = L.featureGroup(), ll, marker, numPts = 0, op, PinIcon = L.Icon.extend({iconSize: new L.Point(20, 23),iconAnchor: new L.Point(10,23)});\
		function checkType( t ) {\
			var i;\
			for(i = wptTypes.length-1; i>=0; i--) {\
				if(t==wptTypes[i][1]) {\
					return wptTypes[i][1];\
				}\
			}\
			return 452;\
		}\
		for( i=plist.primary.length-1; i>= 0; i--) {\
			p = plist.primary[i];\
			ll = L.latLng(p.lat, p.lng);\
			if( context === "listing" || context === "dragdrop" || p.isUserDefined){\
				layers.addLayer(L.marker(ll, {icon: new PinIcon({iconUrl:"/images/wpttypes/pins/" + checkType(p.type) + ".png",iconAnchor: L.point(10,23)}),clickable: false, zIndexOffset:98, title: p.name + (p.isUserDefined?" (Corrected coordinates)":"")}));\
				numPts ++;\
				if(p.isUserDefined) {\
					layers.addLayer(L.marker(ll, {icon: new PinIcon({iconSize: new L.Point(28,23), iconAnchor: L.point(10,23), iconUrl:"', tickIcon, '"}),clickable: false, zIndexOffset:99, title: p.name + " (Corrected coordinates)"}));\
					numPts ++;\
				}\
			}\
			if( p.isUserDefined ) {\
				op = L.latLng( p.oldLatLng[0], p.oldLatLng[1] );\
				layers.addLayer(L.polyline([op, ll], { clickable:false, weight:3 }));\
				if(context === "listing") {\
					layers.addLayer(L.circleMarker(op, {clickable:false, weight:3, radius:6}));\
				}\
			}\
		}\
		for( i=plist.additional.length-1; i>= 0; i--) {\
			p = plist.additional[i];\
			ll = L.latLng(p.lat, p.lng);\
			layers.addLayer(L.marker(ll, {\
				icon: new PinIcon({iconUrl:"/images/wpttypes/pins/" + checkType(p.type) + ".png", iconAnchor: new L.Point(10,23)}),\
				title: p.name, clickable:false\
			}));\
			numPts ++;\
		}\
		if( plist.routes ) {\
			for( i=plist.routes.length-1; i>=0; i--) {\
				if( plist.routes[i].points && plist.routes[i].points.length > 0 ) {\
					layers.addLayer(L.polyline(plist.routes[i].points));\
					numPts+=plist.routes[i].points.length;\
				}\
			}\
		}\
		if( numPts === 0 ) {\
			return false;\
		}\
		bounds = layers.getBounds();\
		if((context === "listing" || context === "clickthru") && ( numPts > 1 )) {\
			map.fitBounds(bounds);\
		} else {\
			map.panTo(bounds.getCenter());\
		}\
		map.addLayer(layers);\
		return bounds;\
	}\
	function extendLeaflet() {\
		L.GME_DistLine = L.Polyline.extend({\
			initialize: function (pts, ops) {\
				L.Polyline.prototype.initialize.call(this, pts, ops);\
				this._length = 0;\
				this._markers = L.layerGroup();\
				this._updateMarkers();\
			},\
			addLatLng: function (pt) {\
				L.Polyline.prototype.addLatLng.call(this, pt);\
				var len = this._latlngs.length;\
				this._addMarker( pt, len );\
				if( len > 1 ) {\
					this._length += this._latlngs[len-2].distanceTo(this._latlngs[len-1]);\
					this.fire("gme-length", {length: this._length});\
				}\
				return this;\
			},\
			getData:function() {\
				return window.btoa ? ("data:application/xml-gpx;base64," + window.btoa(this.getGPX())) : ("data:application/xml-gpx;base64," + encodeURIComponent(this.getGPX()));\
			},\
			getGPX:function() {\
				var author = ["\\t<author>", $(".CommonUsername").attr("title") || "Geocaching.com user", "</author>\\r\\n"].join(""), date = !!Date.prototype.toISOString?["	<time>",new Date().toISOString(),"</time>\\r\\n"].join(""):"", i, l, gpx = ["<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>\\r\\n<gpx xmlns:xsd=\\"http://www.w3.org/2001/XMLSchema\\" xmlns:xsi=\\"http://www.w3.org/2001/XMLSchema-instance\\" version=\\"1.0\\" creator=\\"Geocaching Map Enhancements v", that.getVersion(),"\\" xsi:schemaLocation=\\"http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd\\" xmlns=\\"http://www.topografix.com/GPX/1/0\\">\\r\\n\\t<name>GME Export</name>\\r\\n\\t<desc>Route file exported by Geocaching Map Enhancements</desc>\\r\\n", author, date].join("");\
				for( i = 0, l = this._latlngs.length; i < l; i++ ) {\
					gpx += [ "\\t<wpt lat=\\"", this._latlngs[i].lat, "\\" lon=\\"", this._latlngs[i].lng, "\\">\\r\\n\\t\\t<name>P",i,"</name>\\r\\n\\t\\t<type>Waypoint</type>\\r\\n\\t</wpt>\\r\\n"].join("");\
				}\
				gpx += "\\t<rte>\\r\\n\\t\\t<name>GME exported route</name>\\r\\n\\t\\t<src>Manual entry</src>\\r\\n\\t\\t<number>1</number>\\r\\n";\
				for( i = 0, l = this._latlngs.length; i < l; i++ ) {\
					gpx += [ "\\t\\t<rtept lat=\\"", this._latlngs[i].lat, "\\" lon=\\"", this._latlngs[i].lng, "\\">\\r\\n\\t\\t\\t<name>P",i,"</name>\\r\\n\\t\\t\\t<type>Waypoint</type>\\r\\n\\t\\t</rtept>\\r\\n"].join("");\
				}\
				gpx += "\\t</rte>\\r\\n</gpx>";\
				return gpx;\
			},\
			getLength: function() {\
				return this._length;\
			},\
			onAdd: function(map) {\
				map.addLayer(this._markers);\
				this._markers.eachLayer(function(a) {a.dragging.enable();});\
				return L.Polyline.prototype.onAdd.call(this, map);\
			},\
			onRemove: function(map) {\
				map.removeLayer(this._markers);\
				return L.Polyline.prototype.onRemove.call(this, map);\
			},\
			removePt: function(num) {\
				this.spliceLatLngs(num-1,1);\
				this._updateMarkers();\
			},\
			setLatLngs: function( pts ) {\
				L.Polyline.prototype.setLatLngs.call(this, pts);\
				this._updateMarkers();\
				return this;\
			},\
			_addMarker: function( pt, num ) {\
				var mark = new L.Marker(pt, {\
					icon: new L.Icon({draggable: "true", iconUrl:"', markerIcon, '", iconSize: new L.Point(15, 25), iconAnchor: new L.Point(8,25)}),\
					zIndexOffset:99, title: "Route Point #"+num\
				});\
				mark._routeNum = num;\
				mark.bindPopup(["<p><strong>Route Point #", num, "</strong><br/>Centre: ",pt.toUrl(),"<br/><strong>",DMM(pt),"</strong><br/><span style=\'float:right;\'><a class=\'gme-event\' data-gme-action=\'removeDistMarker\' data-gme-ref=\'",num,"\'>Clear</a>, <a class=\'gme-event\' data-gme-action=\'clearDist\'>Clear All</a>, <a class=\'gme-event gme-draggable-gpx\' data-gme-action=\'exportDist\' draggable=\'true\'>GPX</a></span></p>"].join(""));\
				mark.on("dragend", this._moveMarker, this);\
				this._markers.addLayer( mark );\
				if (mark.dragging) {\
					mark.dragging.enable();\
				}\
			},\
			_moveMarker: function(e) {\
				this.spliceLatLngs(e.target._routeNum - 1, 1, e.target.getLatLng());\
				this._updateLength();\
			},\
			_updateLength: function() {\
				var i;\
				this._length = 0;\
				for( i=1; i< this._latlngs.length; i++) {\
					this._length += this._latlngs[i-1].distanceTo(this._latlngs[i]);\
				}\
				this.fire("gme-length", {length: this._length});\
				return this._length;\
			},\
			_updateMarkers: function() {\
				var i;\
				this._markers.clearLayers();\
				if( this._latlngs.length > 0 ) {\
					this._addMarker( this._latlngs[0],1);\
					for( i=1; i< this._latlngs.length; i++) {\
						this._addMarker( this._latlngs[i], i+1);\
					}\
				}\
				this._updateLength();\
			}\
		});\
		L.GME_QuadkeyLayer = L.TileLayer.extend({\
			tile2quad: function(x, y, z) {\
				var i, digit, mask, quad = "";\
				for(i = z; i > 0; i--) {\
					digit = 0;\
					mask = 1 << (i - 1);\
					if ((x & mask) !== 0) { digit += 1; }\
					if ((y & mask) !== 0) { digit += 2; }\
					quad = quad + digit;\
				}\
				return quad;\
			},\
			getTileUrl: function(tilePoint) {\
				return L.Util.template(this._url, L.extend({\
					s: this._getSubdomain(tilePoint),\
					q: this.tile2quad(tilePoint.x, tilePoint.y, this._getZoomForUrl()),\
					z: this._getZoomForUrl()\
				}, this.options));\
			}\
		});\
		L.GME_complexLayer = L.TileLayer.extend({\
			getTileUrl: function(tilePoint) {\
				return L.Util.template(this._url, L.extend({\
					s4: tilePoint.x%4 + 4*(tilePoint.y%4),\
					x100: this._getZoomForUrl()<=13?"":Math.floor(tilePoint.x/100)+"/",\
					z: this._getZoomForUrl(),\
					x: tilePoint.x,\
					y: tilePoint.y\
				}, this.options));\
			}\
		});\
		L.GME_genericLayer = function( url, options ) {\
			if( typeof url === "string" && typeof options.tileUrl === "string" && typeof options.alt==="string" ) {\
				return (/\\{q\\}/).test(url)?(new L.GME_QuadkeyLayer( url, options )):((/\\{s4\\}|\\{x100\\}/).test(url)?(new L.GME_complexLayer(url,options)):((/\\{x\\}/).test(url)?(new L.TileLayer( url, options )):(new L.TileLayer.WMS( url, options))));\
			} else {\
				log( "Bad map source: " + JSON.stringify( options ));\
				return undefined;\
			}\
		};\
	}\
	function setBrightness(e) {\
		var brightness=this.brightness||that.parameters.brightness;\
		if(brightness<1) {\
			$(".leaflet-container").css("backgroundColor","#000");\
		} else {\
			$(".leaflet-container").css("backgroundColor","#ddd");\
		}\
		if( e.layer._url && /^http/.test(e.layer._url) && e.layer.options && !e.layer.options.overlay ) {\
			e.layer.setOpacity(brightness);\
		}\
	}\
	function switchLayer(e) {\
		var layer = e.layer;\
		if(layer.options && layer.options.tileUrl && !layer.options.overlay ) {\
			this.layersMaxZoom = layer.options.maxZoom;\
			this.layersMinZoom = layer.options.minZoom;\
			if (isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {\
				this._zoomBoundLayers[L.stamp(layer)] = layer;\
				this._updateZoomLevels();\
			}\
			if(this.getZoom() > this.layersMaxZoom) { this.setZoom(this.layersMaxZoom); }\
			if(this.getZoom() < this.layersMinZoom) { this.setZoom(this.layersMinZoom); }\
			this.brightness = e.layer.options.brightness||that.parameters.brightness;\
		}\
	}\
	function GME_load_map(map){\
		var maps={},overlays={},allMaps=that.parameters.maps,baseMaps,control,defMap,i,layer,src;\
		map.on( "layeradd", switchLayer );\
		if( document.createElement("div").style.opacity!==undefined) {\
			map.on( "layeradd", setBrightness);\
		}\
		for(baseMaps=0,defMap=0,i=0;i<allMaps.length;i++) {\
			src = allMaps[i];\
			if(!src.ignore) {\
				layer=L.GME_genericLayer(src.tileUrl,src);\
				if(layer) {\
					if(src.overlay) {\
						overlays[src.alt]=layer;\
					} else {\
						maps[src.alt]=layer;\
						if(src.alt===that.parameters.defaultMap) { defMap = baseMaps; }\
						baseMaps++;\
					}\
				}\
			}\
		}\
		if( baseMaps > 0 ) {',
			GME_page_maps||GME_page_track||GME_page_plan?
				'$($(".leaflet-control-layers")[0]).remove();\
				for( layer in map._layers ) {\
					if( map._layers[layer]._url) {\
						map.removeLayer(map._layers[layer]);\
					}\
				}\
				if( window.MapSettings !== undefined && MapSettings.MapLayers !== undefined && typeof MapSettings.MapLayers.ResetGeocacheLayer === "function" ) {\
					MapSettings.MapLayers.ResetGeocacheLayer();\
				}\
			':'',
			'control = L.control.layers(maps, overlays);\
			map.addControl(control);\
			map.addLayer(control._layers[control._container.getElementsByTagName("input")[defMap].layerId].layer);\
		}\
	}'
].join('');

var GME_script_seek = ['\
	this.seekGR = function(searchVal) {\
		if (searchVal.length > 0) {\
			var coords = parseGR(searchVal);\
			if(coords !== null) {\
				that.seekByLatLng( coords );\
			} else {\
				alert("Could not recognise grid reference.");\
			}\
		}\
	};\
'].join('');					

var GME_script_widget = ['\
	L.GME_Widget=L.Control.extend({\
		options:{position:"bottomleft"},\
		onAdd:function(contextmap){\
			var elem, container=L.DomUtil.create("div","leaflet-control-gme"), control=this, html="";\
			function onPopup(e) {\
				if(e.layer._container && /leaflet-popup/.test(e.layer._container.className)) {\
					$(e.layer._contentNode).on("click", ".gme-event", contextmap, mapHandler);\
					$(e.layer._contentNode).on("dragstart", ".gme-draggable-gpx", {line: control._dist_line}, dragGPXHandler);\
				}\
			}\
			function offPopup(e) {\
				if(e.layer._container && /leaflet-popup/.test(e.layer._container.className)) {\
					$(e.layer._contentNode).off("click", ".gme-event", contextmap, mapHandler);\
					$(e.layer._contentNode).off("dragstart", ".gme-draggable-gpx", {line: control._dist_line}, dragGPXHandler);\
				}\
			}\
			function mapHandler(e) {\
				var action = this.getAttribute("data-gme-action"), c1 = this.getAttribute("data-gme-coords"), c2, coords, data = this.getAttribute("data-gme-ref");\
				e.stopPropagation();\
				if (action !== "exportDist") {\
					e.preventDefault(e);\
				}\
				if( c1 ) {\
					c2 = c1.match(/(-?\\d{1,2}(\\.\\d+)?),(-?\\d{1,3}(\\.\\d+)?)/);\
					if(c2 && c2.length === 5 && validCoords( c2[1], c2[3] )) {\
						coords = new L.LatLng( c2[1], c2[3] );\
					}\
				}\
				if( action === "clearDist" ) { control.clearDist(); }\
				if( action === "clearMarkers" ) { control.clearMarkers(); }\
				if( action === "dropDist" && coords ) { control.dropDist( coords ); }\
				if( action === "dropMarker" && coords ) { control.dropMarker( coords ); }\
				if( action === "exportDist" ) { control.exportDist(this); }\
				if( action === "getGeograph" && coords ) { that.getGeograph( coords ); }\
				if( action === "getHeight" && coords ) { that.getHeight( coords ); }\
				if( action === "getPanoramio" ) { that.getPanoramio( e.data.getBounds(), e.data.getZoom() ); }\
				if( action === "panTo" && coords ) { e.data.panTo( coords ); }\
				if( action === "removeMarker" && data ) { control.removeMarker( data ); }\
				if( action === "removeDistMarker" && data ) { control.removeDistMarker( data ); }\
				if( action === "toggleCaches") { control.toggleCaches() }\
				$(".leaflet-popup-close-button").each(function() {this.click();});\
			}\
			function dragGPXHandler(e) {\
				e.originalEvent.dataTransfer.effectAllowed = "copy";\
				var plain = e.data.line.getGPX(), data = e.data.line.getData();\
				e.originalEvent.dataTransfer.setData("application/xml-gpx", plain);\
				e.originalEvent.dataTransfer.setData("text/uri-list", data);\
				e.originalEvent.dataTransfer.setData("DownloadURL", "application/xml-gpx:gme-export.gpx:" + data);\
				e.originalEvent.dataTransfer.setData("text/plain", plain);\
			}\
			function widgetHandler(e) {\
				var action = this.getAttribute("data-gme-action");\
				e.stopPropagation();\
				if (action === "panToHome") { control.panToHome(); }\
				if (action === "toggleInfo") { control.toggleTool("info"); }\
				if (action === "toggleRoute") { control.toggleTool("route"); }\
			}\
			this._map = contextmap;\
			this._map.infoMode = false;\
			this._map.routeMode = false;\
			this._markers = L.layerGroup().addTo(contextmap);\
			html = "<a class=\'GME_info gme-button gme-button-l\' title=\'Enable location info tool\' data-gme-action=\'toggleInfo\'></a>";\
			html += "<a class=\'GME_route gme-button\' title=\'Enable route tool\' data-gme-action=\'toggleRoute\'></a>";\
			if(userStatus.home) {\
				html += "<a title=\'Go to home location\' class=\'GME_home gme-button\' data-gme-action=\'panToHome\'></a>";\
			}',
			GME_parameters.osgbSearch?
				'$(".GME_search_results").on("click", ".gme-event", contextmap, mapHandler);':'',
			GME_capabilities.storage?
				'html += "<a class=\'GME_config gme-button\' title=\'Configure Geocaching Map Enhancements\' href=\'#GME_config\'></a>";':'',
			'container.innerHTML = html;\
			$(container.lastChild).addClass("gme-button-r");\
			container.innerHTML += "<span class=\'gme-button gme-button-l gme-button-r gme-scale-container\' title=\'Approximate width of the full map view\' style=\'cursor:help;\'>Width: <span class=\'gme-scale\'>" + this.updateScale(this._map) + "</span></span><span class=\'gme-distance-container gme-button gme-button-r\' title=\'Measured distance\'>Route: <span class=\'gme-distance\'>"+ formatDistance(0) +"</span></span>";\
			contextmap.addControl(new L.GME_ZoomWarning()).on("layeradd", onPopup).on("layerremove", offPopup).on("viewreset", this.updateScale, this );\
			$(container).on("click", ".gme-button", this, widgetHandler);\
			$(window).on("resize", this, (function (context) { var t = {timer: null}; return function () { context.updateScale(context._map, t);}; } (this)));\
			return container;\
		},\
		clearDist:function () {\
			this._dist_line.off("gme-length");\
			this._map.removeLayer(this._dist_line);\
			delete this._dist_line;\
			$(".gme-distance-container").removeClass("show");\
			$(".gme-distance").html(formatDistance(0));\
			$(".gme-scale-container").addClass("gme-button-r");\
		},\
		clearMarkers:function () {\
			this._markers.clearLayers();\
		},\
		dropDist:function(ll) {\
			if( !validCoords(ll) ) { return; }\
			var dist, formatted;\
			if( this._dist_line === undefined ) {\
				this._dist_line = new L.GME_DistLine([ll], {clickable:false});\
				this._dist_line.on("gme-length", function (e) { $(this._map._container).find(".gme-distance").html(formatDistance(e.length)); });\
				this._map.addLayer(this._dist_line);\
				$(this._map._container).find(".gme-distance-container").addClass("show");\
				$(this._map._container).find(".gme-scale-container").removeClass("gme-button-r");\
			} else {\
				this._dist_line.addLatLng(ll);\
			}\
		},\
		exportDist:function(e) {\
			if( !this._dist_line) { return; }\
			e.href = "data:application/xml-gpx," + encodeURIComponent(this._dist_line.getGPX());\
			return false;\
		},\
		dropMarker:function(ll) {\
			if( !validCoords(ll) ) { return; }\
			var circle, group, m, r, radius = that.parameters.measure==="metric"?window.prompt("Radius (km)?", 0.161):window.prompt("Radius (miles)?", 0.1);\
			if( radius ) {\
				radius *= that.parameters.measure==="metric"?1000:1609.344;\
				if(isNaN(radius)) { radius = 161; }\
			} else {\
				radius = 161;\
			}\
			circle = new L.Circle( ll, radius, {weight:2} );\
			group = new L.LayerGroup([circle, new L.CircleMarker( ll, {weight:2, radius:3})]);\
			this._markers.addLayer(group);\
			r = that.parameters.measure==="metric"?(radius/1000).toFixed(3)+" km":(radius/1609.344).toFixed(3)+" miles";\
			circle.bindPopup(["<p><strong>Marker</strong><br/>Radius: ", r, "<br/>Centre: decimal ",ll.toUrl(),"<br/><strong>",DMM(ll),"</strong><br/><span style=\'float:right;\'><a class=\'gme-event\' data-gme-action=\'removeMarker\' data-gme-ref=\'",group._leaflet_id,"\'>Clear</a>, <a class=\'gme-event\' data-gme-action=\'clearMarkers\'>Clear All</a></span></p>"].join(""));\
		},\
		panToHome:function () {\
			if( userStatus.home ) {\
				this._map.panTo(userStatus.home);\
				return true;\
			}\
			return false;\
		},\
		removeDistMarker:function(mark){\
			if( this._dist_line ) {\
				this._dist_line.removePt( mark );\
				$(this._map._container).find(".gme-distance").html(formatDistance(this._dist_line.getLength()));\
			}\
		},\
		removeMarker:function(mark){\
			this._markers.removeLayer(this._markers._layers[mark]);\
		},\
		removeMarkers:function(mark){\
			this._markers.clearLayer(this._markers._layers[mark]);\
		},\
		showInfo:function (e) {\
			var control=this, b = control._map.getBounds(), dir="", dist, ll=e.latlng.toUrl(), z=control._map.getZoom(), geograph="", height="", hide="", magic="",nav="", popupContent, popup = new L.Popup(), streetview, sv;\
			if(that.isMAGICAvailable(e.latlng)) {\
				magic=[", <a target=\'magic\' title=\'Show MAGIC map of environmentally sensitive areas\' href=\'http://magic.defra.gov.uk/MagicMap.aspx?srs=WGS84&startscale=",(Math.cos(control._map.getCenter().lat * L.LatLng.DEG_TO_RAD) * 684090188 * Math.abs(b.getSouthWest().lng - b.getSouthEast().lng)) / control._map.getSize().x, "&layers=LandBasedSchemes,12,24:HabitatsAndSpecies,38:Designations,6,10,13,16,34,37,40,72,94&box=", b.toBBoxString().replace(/,/g,":"), "\'>MAGIC</a>"].join("");\
			}\
			if(that.isGeographAvailable(e.latlng)) {\
				geograph=[", <a href=\'#\' title=\'Show Geograph images near this point\' class=\'gme-event\' data-gme-action=\'getGeograph\' data-gme-coords=\'",ll,"\'>Geograph</a>"].join("");\
			}\
			if(e.latlng.lat > -65 && e.latlng.lat < 83) {\
				height=[", <a href=\'#\' title=\'Height of point above sea level\' class=\'gme-event\' data-gme-action=\'getHeight\' data-gme-coords=\'",ll,"\'>Height</a>"].join("");\
			}\
			if (window.MapSettings && MapSettings.MapLayers && MapSettings.MapLayers.AddGeocacheLayer && MapSettings.MapLayers.RemoveGeocacheLayer) {\
				hide = ", <a title=\'Toggles display of geocaches on the map\' href=\'#\' class=\'gme-event\' data-gme-action=\'toggleCaches\'>" + (MapSettings.MapLayers.Geocache ? "Hide" : "Show") + " caches</a>"\
			}\
			if(userStatus.home){\
				dir=[", <br /><a title=\'Launch Google Directions from home to this point\' ",that.parameters.useNewTab?"target=\'directions\' ":"","href=\'https://www.google.com/maps/dir/",userStatus.home.toUrl(),"/",ll,"/\'>Directions</a>"].join("");\
			}\
			if(L.Browser.mobile|L.Browser.android) {\
				sv = ["google.streetview:cbll=",ll,"&cbp=1,0,,0,1&mz=",z].join("");\
				nav = [", <a title=\'Launch Google Navigation app\' href=\'google.navigation:q=",ll,"\'>Navigation</a>"].join("");\
			} else {\
				sv = ["https://maps.google.com/maps?q=&layer=c&cbll=",ll,"&cbp=12,0,0,0,0&z=",z].join("");\
			}\
			streetview = [", <a title=\'Launch Google Streetview\' ",that.parameters.useNewTab?"target=\'streetview\' ":"","href=\'",sv,"\'>Streetview</a>"].join("");\
			popupContent = [\
				"<p><strong>",DMM(e.latlng),"</strong><br/>Dec: <a href=\'geo:",ll,"?z=",z,"\'>",ll,"</a>",\
				"<br/><a title=\'List ",that.parameters.filterFinds?"unfound ":"","caches near point\' href=\'http://www.geocaching.com/seek/nearest.aspx?lat=", e.latlng.lat, "&lng=", e.latlng.lng,that.parameters.filterFinds?"&f=1":"","\' ",that.parameters.useNewTab?"target=\'searchPage\' ":"",">List caches</a>",\
				hide,\
				",<br/><a title=\'Show Panoramio images from the map area\' href=\'#\' class=\'gme-event\' data-gme-action=\'getPanoramio\'>Panoramio</a>",\
				geograph,dir,streetview,nav,\
				",<br/><a title=\'Go to Wikimapia\' ",that.parameters.useNewTab?"target=\'wiki\' ":"","href=\'http://wikimapia.org/#lat=",e.latlng.lat,"&lon=",e.latlng.lng,"&z=",z,"\'>Wikimapia</a>",\
				magic,\
				",<br/><a title=\'Drop a marker circle onto the map\' href=\'#\' class=\'gme-event\' data-gme-action=\'dropMarker\' data-gme-coords=\'",ll,"\'>Marker</a>",\
				height,"</p>"].join("");\
			popup.setLatLng(e.latlng);\
			popup.setContent(popupContent);\
			control._map.addLayer(popup);\
		},\
		showRoute:function(e) {\
			L.DomEvent.stopPropagation(e);\
			this.dropDist(e.latlng);\
		},\
		toggleCaches:function() {\
			if (window.MapSettings && MapSettings.MapLayers && MapSettings.MapLayers.AddGeocacheLayer && MapSettings.MapLayers.RemoveGeocacheLayer) {\
				if(MapSettings.MapLayers.Geocache) {\
					MapSettings.MapLayers.RemoveGeocacheLayer();\
				} else {\
					MapSettings.MapLayers.AddGeocacheLayer();\
				}\
			}\
		},\
		toggleTool:function(mode) {\
			var that = this, widgets = {\
				info: {\
					on: function() {\
						that._map.on("click contextmenu",that.showInfo,that);\
						$("#map_canvas").addClass("gme-xhair");\
						$(".GME_info").addClass("gme-button-active").attr("title","Disable location info tool");\
					},\
					off: function() {\
						that._map.off("click contextmenu",that.showInfo,that);\
						$("#map_canvas").removeClass("gme-xhair");\
						$(".GME_info").removeClass("gme-button-active").attr("title","Enable location info tool");\
					}\
				},\
				none: {on: function() {}, off: function() {}},\
				route: {\
					on: function() {\
						that._map.on("click contextmenu",that.showRoute,that);\
						$("#map_canvas").addClass("gme-xhair");\
						$(".GME_route").addClass("gme-button-active").attr("title","Disable route tool");\
					},\
					off: function() {\
						that._map.off("click contextmenu",that.showRoute,that);\
						$("#map_canvas").removeClass("gme-xhair");\
						$(".GME_route").removeClass("gme-button-active").attr("title","Enable route tool");\
					}\
				}\
			};\
			if (!widgets[mode]) {\
				return;\
			}\
			widgets[this._clickMode].off();\
			if (mode == this._clickMode) {\
				this._clickMode = "none";\
			} else {\
				this._clickMode = mode;\
				widgets[mode].on();\
			}\
		},',
		GME_parameters.osgbSearch?
		'search:function (searchVal) {\
			var gr, m, call, callbackPrefix = "GME_search_callback", coords=false, marker, that=this;\
			function searchGS(searchVal) {\
				$(".GME_search_results").addClass("hidden");\
				$.getJSON("/api/geocode",{q:searchVal},function(a){\
					if( a.status==="success" ) {\
						that._map.panTo(new L.LatLng(a.data.lat,a.data.lng));\
					} else {\
						alert("Sorry, no results found for "+searchVal);\
					}\
				});\
			}\
			function makeCallback2(callname) { callbackCount++; return function(json) {\
				var i,j;\
				if(json.geonames && json.geonames.length > 0) {\
					$(".GME_search_list").empty();\
					for( i=0,j=json.geonames.length;i<j;i++ ) {\
						$(".GME_search_list").append(["<li><a class=\'gme-event\' data-gme-action=\'panTo\' data-gme-coords=\'",json.geonames[i].lat,",",json.geonames[i].lng,"\'>",json.geonames[i].name,", ",json.geonames[i].adminName1,", ",json.geonames[i].countryCode,"</a></li>"].join(""));\
					}\
					$(".GME_search_results").removeClass("hidden");\
					$(".GME_search_results.ui-collapsible-collapsed a.ui-collapsible-heading-toggle").click();\
					$(".GME_link_GSSearch").off( "click" );\
					$(".GME_link_GSSearch").click( function () { searchGS(searchVal); } );\
					that._map.panTo(new L.LatLng(json.geonames[0].lat,json.geonames[0].lng));\
				} else {\
					searchGS(searchVal);\
				}\
				$("#"+callname).remove();\
				if( window[callname] !== undefined ) { delete window[callname]; }\
			};}\
			function makeCallback1(callname) { callbackCount++; return function(json) {\
				var call=callbackPrefix+callbackCount;\
				if( json.countryCode ) {\
					window[call] = makeCallback2(call);\
					JSONP(["http://api.geonames.org/searchJSON?q=", encodeURIComponent(searchVal),"&countryBias=", json.countryCode, "&maxRows=10&username=gme&callback=",call].join(""), call );\
				} else {\
					searchGS(searchVal);\
				}\
				$("#"+callname).remove();\
				if( window[callname] !== undefined ) { delete window[callname]; }\
			};}\
			if (searchVal.length > 0) {\
				m = searchVal.match(/^\\s*(?:z|zoom)\\s*(\\d\\d?)\\s*$/i);\
				if( m && m.length === 2) {\
					this._map.setZoom(m[1]);\
					return false;\
				}\
				m = searchVal.match(/^\\s*(?:p|plot)\\s+(.*)/);\
				if( m && m.length === 2) {\
					coords = parseCoords( m[1] );\
					if( coords ) {\
						marker = L.marker( coords, {icon: L.divIcon()} ).addTo(this._map).bindPopup(DMM(coords));\
						this._map.panTo(coords);\
						alert(["Plot: ", coords.lat, ", ", coords.lng].join(""));\
						return false;\
					}\
				}\
				m = searchVal.match(/^\\s*(GC[0123456789ABCDEFGHJKMNOPQRSTVWXYZ]{1,7})\\s*$/i);\
				if( m && m.length === 2) {\
					if(userStatus.loggedin) {\
						this.panToGC(m[1]);\
						$(".GME_search_results").addClass("hidden");\
						return false;\
					}\
					alert("You must be logged in to allow GME to get cache coordinates");\
					return false;\
				}\
				gr = parseGR(searchVal);\
				if( gr ) {\
					this._map.panTo(new L.LatLng(gr.lat,gr.lng));\
				} else {\
					call = callbackPrefix + callbackCount;\
					window[call] = makeCallback1( call );\
					JSONP(["http://api.geonames.org/countryCode?lat=", this._map.getCenter().lat, "&lng=", this._map.getCenter().lng, "&type=JSON&username=gme&radius=100&callback=",call].join(""), call);\
				}\
			}\
			return false;\
		},\
		panToGC:function(gc) {\
			var map = this._map;\
			$.get("http://www.geocaching.com/seek/cache_details.aspx?wp="+gc, function(data){\
				try {\
					var r = data.match(/mapLatLng = (\\{.*?\\})/)[1],\
					c = JSON.parse(r);\
					map.panTo(new L.LatLng(c.lat, c.lng));\
				} catch(e) {\
					log("Couldn\'t fetch cache coordinates:" + e);\
				}\
			});\
			return false;\
		},':'',
		'updateScale:function (e, timer) {\
			var map;\
			function update(m) {\
				var b, w;\
				b = m.getBounds();\
				w = formatDistance(Math.cos(m.getCenter().lat * L.LatLng.DEG_TO_RAD) * 111319.49079327358 * Math.abs(b.getSouthWest().lng - b.getSouthEast().lng));\
				$(m._container).find(".gme-scale").html(w);\
				return (w);\
			}\
			if (this._map && this._map.getBounds) {\
				map = this._map;\
			} else {\
				if(e && e.getBounds) {\
					map = e;\
				} else {\
					return;\
				}\
			}\
			if (timer !== undefined) {\
				window.clearTimeout(timer.timer);\
				timer.timer = window.setTimeout( function() { update(map); return false; }, 200 );\
				return false;\
			} else {\
				return update(map);\
			}\
		},\
		_clickMode: "none"\
	});\
	if (window.Groundspeak && Groundspeak.Map && Groundspeak.Map.Control && Groundspeak.Map.Control.FindMyLocation) {\
		L.GME_FollowMyLocationControl=Groundspeak.Map.Control.FindMyLocation.extend({\
			onAdd:function(map){\
				var el, tracking=false, container=L.DomUtil.create("div","leaflet-control-toolbar groundspeak-control-findmylocation gme-left");\
				function located(l){\
					this.panTo(l.latlng);\
				}\
				function click(e){\
					L.DomEvent.stopPropagation(e);\
					if( tracking ) {\
						map.stopLocate();\
						map.off("locationfound",located);\
						tracking = false;\
						$(".groundspeak-control-findmylocation-lnk").removeClass("gme-button-active");\
						$("#GME_loc").attr("title","Follow My Location");\
					} else {\
						map.on("locationfound",located);\
						map.locate({enableHighAccuracy:true,watch:true,timeout:60000});\
						tracking = true;\
						$(".groundspeak-control-findmylocation-lnk").addClass("gme-button-active");\
						$("#GME_loc").attr("title","Stop following");\
					}\
				}\
				function click_once(e) {\
					L.DomEvent.stopPropagation(e);\
					this.locate({setView:true,maxZoom:this.getZoom(),minZoom:this.getZoom(),enableHighAccuracy:true,timeout:60000});\
				}\
				el = document.createElement("a");\
				el.id="GME_loc";\
				el.title=that.parameters.follow?"Follow My Location":"Find My Location";\
				el.className="groundspeak-control-findmylocation-lnk";\
				if(that.parameters.follow) {\
					L.DomEvent.addListener(el,"click",click,map);\
				} else {\
					L.DomEvent.addListener(el,"click",click_once,map);\
				}\
				container.appendChild(el);\
				return container;\
			},\
		});\
	}\
	L.GME_ZoomWarning=L.Control.extend({\
		options:{position:"topleft"},\
		onAdd:function(map){\
			var c = L.DomUtil.create("div","leaflet-control-zoomwarning gme-left");\
			function checkZoom() {\
				if( map.getZoom() > map.layersMaxZoom ) {\
					map.setZoom( map.layersMaxZoom );\
				}\
				if( map.getZoom() < map.layersMinZoom ) {\
					map.setZoom( map.layersMinZoom );\
				}\
				if(this.getZoom() > 18 ) {\
					c.style.display = "block";\
					if(typeof amplify === "object" && typeof amplify.store==="function" && amplify.store("ShowPanel")) {\
						$(".leaflet-control-zoomwarning").css("left","385px");\
					}\
				} else {\
					c.style.display = "none";\
				}\
			}\
			c.innerHTML = "<a class=\'gme-button gme-button-l gme-button-r\' title=\'Caches not visible at this zoom level\'></a>";\
			c.style.display = (map.getZoom() > 18)?"block":"none";\
			map.on("zoomend", checkZoom);\
			return c;\
		}\
	});\
	if (L.LatLng.prototype.toUrl === undefined) {\
		L.LatLng.prototype.toUrl = function() { return this.lat.toFixed(6) + "," + this.lng.toFixed(6); }\
	}\
	if ($.fancybox === undefined) {\
		log("Fetching Fancybox");\
		$("head").append("<link rel=\'stylesheet\' type=\'text/css\' href=\'http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css\'>");\
		JSONP("http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js");\
	}\
	function GME_load_widget(map){\
		var control = new L.GME_Widget().addTo(map);\
		$(control._container).addClass("gme-left").css("top", "20px");\
		$(".groundspeak-control-findmylocation").remove();\
		if (L.GME_FollowMyLocationControl) {\
			map.addControl(new L.GME_FollowMyLocationControl());\
		}\
		$(".leaflet-control-scale").addClass("gme-control-scale");\
		$("a.ToggleSidebar").unbind();\
		$("a.ToggleSidebar").click( function(a){\
			a.preventDefault();\
			if( pnlOpen ) {\
				pnlOpen=false;\
				$(".Sidebar").animate({left:"-355px"},500);\
				$(".leaflet-control-zoom,.leaflet-control-toolbar,.leaflet-control-scale,.gme-left").animate({left:"30px"},500);\
				$(this).removeClass("Open");\
			} else {\
				pnlOpen=true;\
				$(".Sidebar").animate({left:"0"},500);\
				$(".leaflet-control-zoom,.leaflet-control-toolbar,.leaflet-control-scale,.gme-left").animate({left:"385px"},500);\
				$(this).addClass("Open");\
			}\
			amplify.store("ShowPanel",pnlOpen);\
			return false;\
		});\
		return control;\
	}\
'].join('');

insertCSS( GME_css );	
if( GME_capabilities.storage ) {
	insertPage( 'GME_config', GME_html_config, 'Configure GME v' +GME_parameters.version );
	insertPage( 'GME_format', GME_html_custominfo, 'Custom Mapsource Format', 'GME_config' );
}

if( GME_page_listing ) {
	// On a geocache listing
	if(!GME_capabilities.loggedin) {
		// Not logged in, so no maps or coordinates...
		return;
	}
	if(GME_capabilities.dragdrop) { insertCSS( GME_css_drag ); }
	insertScript([
		'var GME, GME_Map;\
		(function () {\
			"use strict";\
			function GeocachingMapEnhancements() {\
				var cache_coords = {};',
				GME_script_common, GME_capabilities.storage?GME_script_config:'', GME_script_map, GME_script_widget, GME_capabilities.geolocation?GME_script_dist:'', GME_capabilities.dragdrop?GME_script_drag:'', GME_capabilities.dragdrop?GME_script_drop:'',
				'function load() {\
					var parkUrl="", label="", i, parking;\
					if(L.LatLng.prototype.toUrl === undefined) {\
						L.LatLng.prototype.toUrl=function(){var obj=this;if(!(obj instanceof L.LatLng)){return false;}return[L.Util.formatNum(obj.lat,5),L.Util.formatNum(obj.lng,5)].join(",");};\
					}\
					$("#map_canvas").replaceWith("<div style=\'width: 325px; height: 325px; position: relative;\' id=\'map_canvas2\'></div>");',
					GME_capabilities.dragdrop?'\
						$("#cacheDetails .cacheImage").hover(function(e) { $("#cacheDetails .cacheImage").addClass("moveable"); },function(e) { $("#cacheDetails .cacheImage").removeClass("moveable"); });\
						$("#cacheDetails .cacheImage").attr("draggable","true").on("dragstart", that.dragStart);\
						$("#cacheDetails .cacheImage a").removeAttr("href");\
					':'',
					'GME_Map = new L.Map("map_canvas2",{center: new L.LatLng(mapLatLng.lat, mapLatLng.lng), zoom:14});\
					GME_Map.addControl(new L.control.scale());\
					GME_load_map(GME_Map);\
					cache_coords = { primary:[mapLatLng], additional:[] };\
					if (cmapAdditionalWaypoints && cmapAdditionalWaypoints.length > 0 ) {\
						cache_coords.additional = cmapAdditionalWaypoints;\
						if( userStatus.home ) {\
							for(i=cmapAdditionalWaypoints.length-1;i>=0;i--) {\
								parking = cmapAdditionalWaypoints[i];\
								if( parking.type === 217 || parking.type === 221 ) {\
									label = parking.type===217?"Parking Area":"Trailhead";\
									parkUrl = ["https://www.google.com/maps/dir/",userStatus.home.toUrl(),"/", parking.lat, ",", parking.lng, "/"].join("");\
									$("#awpt_"+parking.pf)[0].parentNode.parentNode.children[7].innerHTML += "<a target=\\\"_blank\\\" href=\\\""+parkUrl+"\\\"><img width=\\\"16\\\" height=\\\"16\\\" title=\\\"Directions to "+label+"\\\" alt=\\\""+label+"\\\" src=\\\"http://www.geocaching.com/images/wpttypes/sm/pkg.jpg\\\" /></a>";\
								}\
							}\
						}\
					}',
					GME_capabilities.dragdrop?'GME_Map.addControl(new L.GME_dropHandler());':'',
					GME_capabilities.storage?
						'if(cache_coords.primary[0].oldLatLng || cache_coords.primary.length + cache_coords.additional.length > 1) {\
							localStorage.setItem( "GME_cache", JSON.stringify(cache_coords));\
							document.getElementById("ctl00_ContentBody_uxViewLargerMap").href += "&pop=true";\
							$(\'#ctl00_ContentBody_MapLinks_MapLinks a[href*="geocaching\\\\.com"]\').attr("href", function(i, val) {return val + "&pop=true";});\
						}':'',
					'GME_displayPoints( cache_coords, GME_Map, "listing" );\
				}\
				checkAPI();\
			}\
			GME = new GeocachingMapEnhancements();\
		}());'
	].join(""), "GME_page_listing");
} else {
	if(GME_page_seek) {
		// On the Hide & Seek page
		var i,j, target, target2 = document.querySelector(".SeekCacheWidget h4"), targets = document.getElementsByTagName("h5");
		for( i=0,j=targets.length; i<j; i++) {
			if( targets[i].innerHTML.match(/WGS84/)) {
				target = targets[i];
				break;
			}
		}
		
		if( target && target2) {
			var grDiv = document.createElement("div"), hereDiv = document.createElement("div");
			grDiv.innerHTML = '<h5>Ordnance Survey Grid Reference :</h5><dl><dt>Grid reference : </dt><dd><form name="grForm" id="grForm"><input type="text" class="Text EqualWidthInput" maxlength="50" size="15" name="grRef" id="grRef" placeholder="SU122422">&nbsp;<input type="submit" class="Button blockWithModalSpinner" name="submitGR" value="Go" id="grSub"></form></dd></dl><h5>Freeform coordinates</h5><dl><dt>Coordinates :</dt><dd><form name="coordForm" id="coordForm"><input type="text" class="Text EqualWidthInput" maxlength="50" size="15" name="gme_coords" id="gme_coords" placeholder="N 51° 10.683′ W 001° 49.604′"/>&nbsp;<input type="submit" class="Button blockWithModalSpinner" name="gme_coords_sub" value="Go" id="gme_coords_sub"/></form></dd></dl>';
			hereDiv.innerHTML = '<h4>Where you are...</h4><dl><dt>Use GeoLocation :</dt><dd><form name="hereForm" id="hereForm"><input type="submit" class="Button blockWithModalSpinner" name="GME_hereSub" value="Go" id="GME_hereSub"></form></dd></dl><h4>By keyword...</h4><dl><dt>Google search :</dt><dd><form name="googleForm" id="googleForm"><input type="text" class="Text EqualWidthInput" maxlength="50" size="15" name="gme_google" id="gme_google"/><input type="submit" class="Button blockWithModalSpinner" name="GME_googleSub" value="Go" id="GME_googleSub"></form></dd></dl>';
			target.parentNode.insertBefore(grDiv,target);
			target2.parentNode.insertBefore(hereDiv,target2);

			insertScript([
				'var GME;\
				(function () {\
					"use strict";\
					function GeocachingMapEnhancements() {',
						GME_script_common, GME_capabilities.storage?GME_script_config:'', GME_script_osgb, GME_script_seek,
						'function load() {\
							function goGR(e) {\
								if (e.type === "click" || (e.type === "keypress" && e.which === 13)) {\
									e.preventDefault();\
									e.stopImmediatePropagation();\
									that.seekGR( $.trim($("#grRef").val()));\
									return false;\
								}\
							}\
							function goCoords(e) {\
								var c, coords;\
								if (e.type === "click" || (e.type === "keypress" && e.which === 13)) {\
									e.preventDefault();\
									e.stopImmediatePropagation();\
									c=document.getElementById("gme_coords").value;\
									if(c) {\
										coords = parseCoords( c );\
										if( coords ) {\
											that.seekByLatLng( coords );\
											return false;\
										}\
									}\
								}\
							}\
							function goGoogle(e) {\
								var q = document.getElementById("gme_google").value.trim(), url;\
								e.preventDefault();\
								e.stopImmediatePropagation();\
								if( q ) {\
									url = ["https://www.google.co.uk/search?q=", encodeURIComponent(q), "+site%3Awww.geocaching.com%2Fseek%2Fcache_details.aspx"].join("");\
									if( that.parameters.useNewTab ) {\
										window.open( url, "searchPage" );\
									} else {\
										document.location = url;\
									}\
								}\
								return false;\
							}\
							$("#grRef").keypress(goGR);\
							$("#grSub").click(goGR);\
							$("#gme_coords").keypress(goCoords);\
							$("#gme_coords_sub").click(goCoords);\
							$("#GME_hereSub").click(that.seekHere);\
							$("#GME_googleSub").click(goGoogle);\
						}\
						checkAPI();\
					}\
					GME = new GeocachingMapEnhancements();\
				}());'
			].join(''), "GME_page_seek");
		}
	} else {
		// On a TB tracking map
		if( GME_page_track ) {
			if(!GME_capabilities.loggedin) {
				// Not logged in, so no maps or coordinates...
				return;
			}
			insertScript([
				'var GME;\
				(function () {\
					"use strict";\
					function GeocachingMapEnhancements() {',
						GME_script_common, GME_capabilities.storage?GME_script_config:'', GME_script_map, GME_script_widget,
						'function load() {\
							var caches, coords, i, j, layer, name;\
							GME_load_map(map);\
							map.addControl(new L.GME_Widget);\
							$("#ctl00_ContentBody_lbHeading").append("<a id=\'GME_map_anchor\'></a>");\
							caches = $(".TrackableLogTable a[href*=cache_details]");\
							for( i = caches.length - 1; i >= 0; i--) {\
								name = caches[i].textContent.trim();\
								for( j in map._layers ) {\
									layer = map._layers[j];\
									if( layer._latlng && layer._popup && layer._popup._content && ~layer._popup._content.indexOf(name) ) {\
										coords = layer._latlng;\
										$(caches[i].parentNode.parentNode.children[0]).append(["<br/><a href=\'#GME_map_anchor\'><img src=\'http://www.geocaching.com/images/silk/map.png\' width=\'16\' height=\'16\' alt=\'Map\' class=\'gme-action\' data-gme-ref=\'" + coords.lat + "," + coords.lng + "\' title=\'Centre map on this geocache\'/></a> #", layer._icon.innerHTML ].join(""));\
										break;\
									}\
								}\
							}\
						}\
						$(".TrackableLogTable").on("click", ".gme-action", function(e) { map.panTo(L.latLng(this.getAttribute("data-gme-ref").split(","))); });\
						checkAPI();\
					}\
					GME = new GeocachingMapEnhancements();\
				}());'
			].join(''), "GME_page_track");
		} else {
			if( GME_page_maps ) {
				// On a Geocaching Maps page
				if(document.querySelector("script[src*='//maps.googleapis.com/']")){
					log("Geocaching Map Enhancements requires Leaflet Maps to be enabled.");
					return;
				}

	//	<bugfix>
				// Trixie treats jQuery Mobile dialogs as new page loads, resetting GME's functions
				if( window.GME !== undefined ) { return; }
	//	</bugfix>

	//	<bugfix>
				// Work around bug that breaks JQuery Mobile dialog boxes in Opera 12.
				insertScript('$.support.cssTransitions = false;', "jquerymobile_transitions_bugfix");
	//	</bugfix>

				insertScript([
					'var GME, GME_control;\
					(function () {\
						"use strict";\
						function GeocachingMapEnhancements() {',
							GME_script_common, GME_capabilities.storage?GME_script_config:'', GME_script_map, GME_script_widget, GME_script_labels, GME_capabilities.dragdrop?GME_script_drop:'', GME_parameters.osgbSearch?GME_script_osgb:'',
							'function load() {\
								GME_load_map(MapSettings.Map);',
								GME_capabilities.dragdrop?
									'MapSettings.Map.addControl(new L.GME_dropHandler());':'',
								GME_parameters.osgbSearch?
									'$(".SearchBox").replaceWith(\''+GME_html_search+'\');':'',
								'GME_control = GME_load_widget(MapSettings.Map);\
								GME_load_labels(GME_control,"#scroller");',
								GME_parameters.osgbSearch?
									'$("#SearchBox_OS").click(function (e) {\
										e.preventDefault();\
										e.stopImmediatePropagation();\
										return GME_control.search($.trim($("#SearchBox_Text").val()||""));\
									});\
									$("#search p")[0].innerHTML="Search by <span style=\'cursor:help;\' title=\'Enhanced by Geonames\'>Address</span>, Coordinates, GC-code,<br/><span style=\'cursor:help;\' title=\'Jump to a specific zoom level by typing zoom then a number. Zoom 1 shows the whole world, maxiumum zoom is normally 18-22.\'>zoom</span> or <span style=\'cursor:help;\' title=\'To search using a British National Grid reference, just type it in the search box and hit the button! You can use 2, 4, 6, 8 or 10-digit grid refs with the 2-letter prefix but no spaces in the number (e.g. SU12344225) or absolute grid refs with a comma but no prefix (e.g. 439668,1175316).\'>Grid Ref</span>";':'',
								'if(amplify&&typeof amplify.store("ShowPanel")!=="undefinded"&&amplify.store("ShowPanel")) {\
									$(".leaflet-control-toolbar,.groundspeak-control-findmylocation,.leaflet-control-scale,.gme-left").css("left","385px");\
								}',
								GME_capabilities.storage?
									'if( /pop=true/.test(location.search)) {\
										try{\
											GME_displayPoints(JSON.parse(localStorage.GME_cache),GME_control._map,"clickthru");\
										} catch(e) {}\
									}':'',
							'}\
							checkAPI();\
						}\
						GME = new GeocachingMapEnhancements();\
					}());'
				].join(""), "GME_page_map");
			} else {
				if ( GME_page_plan ) {
					insertScript([
						'var GME, GME_control;\
						(function () {\
							"use strict";\
							function GeocachingMapEnhancements() {',
								GME_script_common, GME_capabilities.storage?GME_script_config:'', GME_script_map, GME_script_widget, GME_capabilities.dragdrop?GME_script_drop:'',
								'function load() {\
									GME_load_map(map);\
									GME_control = new L.GME_Widget().addTo(map);',
									GME_capabilities.dragdrop?
										'map.addControl(new L.GME_dropHandler());':'',
									'}',
									GME_capabilities.storage?
										'if( /pop=true/.test(location.search)) {\
											try{\
												GME_displayPoints(JSON.parse(localStorage.GME_cache),GME_control._map,"clickthru");\
											} catch(e) {}\
										}':'',
								'window.setTimeout(checkAPI, 5000);\
							}\
							GME = new GeocachingMapEnhancements();\
						}());'
					].join(""), "GME_page_map");
				} else {
					// Somewhere random on the main website
					if( GME_capabilities.storage ) {
						insertScript([
							'var GME;\
							(function () {\
								"use strict";\
								function GeocachingMapEnhancements() {',
									GME_script_common, GME_script_config,
								'}\
								GME = new GeocachingMapEnhancements();\
							}());'
						].join(''), "Generic config" );
					}
				}
			} // Default
		}
	}
}
}());
