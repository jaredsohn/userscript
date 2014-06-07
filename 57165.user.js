// ==UserScript==
// @name           osm4gc
// @namespace      http://dosensuche.de
// @description    adds links to OpenStreetMap
// @include        http://www.geocaching.com/seek/cache_details.aspx?*
// ==/UserScript==
// Author: guido.wegener@gmx.de

var mapSpan=document.getElementById("ctl00_ContentBody_MapLinks_MapLinks");
var gmUrl=mapSpan.firstChild.firstChild.getAttribute("href");
var filter=/\?lat=(.*)&lng=(.*)/;
filter.exec(gmUrl);
var lng=RegExp.$2;
var lat=RegExp.$1;
var wp=document.getElementById("ctl00_cacheCodeWidget").getElementsByTagName("p")[0].firstChild.data;
filter=/^\s*(\w+)\s*$/;
filter.exec(wp);
wp=RegExp.$1;
GM_log(wp+": "+lng+" - "+lat+" (= "+d2dm(lng,"%B0")+" - "+d2dm(lat,"%B0")+")");


addLink("OpenStreetMap","http://www.openstreetmap.org/?lat="+lat+"&lon="+lng+"&zoom=14&layers=B000FTF&mlat="+lat+"&mlon="+lng);
addLink("OpenCycleMap","http://www.opencyclemap.org/?lat="+lat+"&lon="+lng+"&zoom=14&layers=B000");
addLink("NSG Cache Checker","http://www.nsg-atlas.de/NSG/index.php?lat="+d2dm(lat,"%B0")+"&lon="+d2dm(lng,"%B0")+"&WP="+wp);


function d2dm(degrees,separator) {
	var sign=degrees<0?"-":"";
	degrees=Math.abs(degrees);
	var d=Math.floor(degrees);
	var m=(degrees-d)*60;
	return sign+d+separator+m.toFixed(3);
}

function addLink(title,url) {
	var li=document.createElement("li");
	var a=document.createElement("a");
	a.href=url;
	a.target="_blank";
	var txt=document.createTextNode(title);
	a.appendChild(txt);
	li.appendChild(a);
	mapSpan.appendChild(li);
}
