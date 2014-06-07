// ==UserScript==
// @name           OSM History Viewer link
// @namespace      eu.cdauth.osm
// @description    Adds links to OSM History Viewer on OpenStreetMap relation and changeset pages.
// @include        http://www.openstreetmap.org/browse/*
// ==/UserScript==

var trans = {
	"relation" : {
		"de" : "Täteranzeige im OSM History Viewer",
		"en" : "Blame in OSM History Viewer"
	},
	"changeset" : {
		"de" : "Im OSM History Viewer anzeigen",
		"en" : "View in OSM History Viewer"
	}
};

var m = location.pathname.match(/^\/browse\/(changeset|relation)\/(\d+)/);
if(m)
{
	var type = m[1];
	var id = m[2];
	var lang = unsafeWindow.OpenLayers.Lang.getCode();

	var hvLink = document.createElement("a");
	hvLink.href = "http://osm.cdauth.eu/history-viewer/" + (type == "relation" ? "blame" : "changeset") + ".jsp?id=" + encodeURIComponent(id);
	hvLink.appendChild(document.createTextNode(trans[type][lang] == null ? trans[type]["en"] : trans[type][lang]));

	var largerMapNext = document.getElementById(type == "relation" ? "object_larger_map" : "area_larger_map").nextSibling;
	largerMapNext.parentNode.insertBefore(document.createElement("br"), largerMapNext);
	largerMapNext.parentNode.insertBefore(hvLink, largerMapNext);
}