// ==UserScript==
// @name           OSM Route Manager link
// @namespace      eu.cdauth.osm
// @description    Adds a link to OSM Route Manager on the OpenStreetMap relation pages.
// @include        http://www.openstreetmap.org/browse/relation/*
// ==/UserScript==

var trans = {
	"de" : "Im OSM Route Manager anzeigen",
	"en" : "View in OSM Route Manager"
};

var m = location.pathname.match(/^\/browse\/relation\/(\d+)/);
if(m)
{
	var id = m[1];
	var lang = unsafeWindow.OpenLayers.Lang.getCode();

	var hvLink = document.createElement("a");
	hvLink.href = "http://osm.cdauth.eu/route-manager/relation.jsp?id=" + encodeURIComponent(id);
	hvLink.appendChild(document.createTextNode(trans[lang] == null ? trans["en"] : trans[lang]));

	var largerMapNext = document.getElementById("object_larger_map").nextSibling;
	largerMapNext.parentNode.insertBefore(document.createElement("br"), largerMapNext);
	largerMapNext.parentNode.insertBefore(hvLink, largerMapNext);
}