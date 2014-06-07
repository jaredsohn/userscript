// ==UserScript==
// @name           OpenStreetMap Geocaching Link
// @namespace      davidfichtmueller.de
// @description    adds a link to Geocaching.org on OpenStreetMap

// @include        http://www.openstreetmap.org/*
// @exclude        http://www.openstreetmap.org/diary*
// @exclude        http://www.openstreetmap.org/traces*
// @exclude        http://www.openstreetmap.org/export*
// @exclude        http://www.openstreetmap.org/history*
// @exclude        http://www.openstreetmap.org/history*
// @exclude        http://www.openstreetmap.org/browse*
// @exclude        http://www.openstreetmap.org/api*

// @include        http://openstreetmap.org/*
// @exclude        http://openstreetmap.org/diary*
// @exclude        http://openstreetmap.org/traces*
// @exclude        http://openstreetmap.org/export*
// @exclude        http://openstreetmap.org/history*
// @exclude        http://openstreetmap.org/history*
// @exclude        http://openstreetmap.org/browse*
// @exclude        http://openstreetmap.org/api*

// @license     MIT License; http://www.opensource.org/licenses/mit-license.php
// @version     0.4

// ==/UserScript==

var openInWindow = GM_getValue('openInWindow',false);
if(openInWindow){
	GM_registerMenuCommand("OSM: open GC URL in same window", setOpenInWindow);
}else{
	GM_registerMenuCommand("OSM: open GC URL in new window", setOpenInWindow);
}


GM_registerMenuCommand("OSM: Set GC URL", set_url);

var url = (GM_getValue('url','http://www.geocaching.com/map/default.aspx#?ll=<lat>,<long>&z=<zoom>'));

function set_url() {
	url = prompt('URL', url);
	GM_setValue('url', url);
}

function setOpenInWindow() {
	openInWindow = GM_getValue('openInWindow',false);
	GM_setValue('openInWindow',!openInWindow);
	location.reload();
}

var tabnav = document.getElementById("edit_tab").parentNode;
if(tabnav){
	var li = document.createElement('li');
	li.innerHTML = "<a href='#' class='tab' class='tab' onclick='goToGeocaching();return false;' id='geocachingLink' title='Link to Geocaching' >Geocaching</a>";
	tabnav.appendChild(li);
}

var script = "//<![CDATA[\n\n"+
"function goToGeocaching(){\n"+
"	var link = document.getElementById('long_input').value;\n"+
"	if(link){\n"+
"		var zoomStart = link.indexOf('map=');\n"+
"		var zoomEnd = link.indexOf('/',zoomStart);\n"+
"		var zoom = link.substring(zoomStart+4, zoomEnd);\n"+
"		var latStart = zoomEnd+1;\n"+
"		var latEnd = link.indexOf('/',latStart);\n"+
"		var lat = link.substring(latStart, latEnd);\n"+
"		var lonStart = latEnd+1;\n"+
"		var lon = link.substring(lonStart);\n"+
"		var gclink = '"+url+"';\n"+
"		var outlink = gclink.replace('<lat>', lat).replace('<long>', lon).replace('<zoom>', zoom);\n";
if(openInWindow){
	script = script+"		window.open(outlink);\n";
}else{
	script = script+"		window.location = outlink;\n";
}
script = script+"	}\n"+
"}\n"+
"//]]>";

//add functions to header
var header = document.getElementsByTagName('head')[0];
var scriptelement = document.createElement('script');
scriptelement.type = 'text/javascript';
scriptelement.innerHTML = script;
header.appendChild(scriptelement)
