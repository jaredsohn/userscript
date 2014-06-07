// ==UserScript==
// @name          nature.cacherstats.de Skript
// @namespace     http://cacherstats.de
// @description   nature.cacherstats.de Skript
// @author        Markus Hildebrandt
// @version       0.4
// @license       GPLv3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include	http://www.geocaching.com/seek/cache_details*
// @require http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

nature_header = '<h3 class="WidgetHeader" style="margin-top:1em; font-size:100%"><strong>nature.cacherstats.de</strong></h3>';
var origCoordinatesTemp = document.getElementById('uxLatLon').innerHTML;
var origCoordinates = parseCoordinates(origCoordinatesTemp);
var origClat = origCoordinates[0];
var origClon = origCoordinates[1];

var nat1_header = document.createElement('span');
var gccode = document.getElementById("ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode").innerHTML;
var gcuser = $("[class='SignedInProfileLink']").html();

nat1_header.innerHTML = nature_header;

var nat1_inner = document.createElement('span');
nat1_inner.innerHTML = '<iframe id ="ncsde" src="http://46.38.235.226/naturebadge/upload.php?extgcuser='+gcuser+'&extgccode='+gccode+'&extlat='+origClat+'&extlon='+origClon+'" style="margin: 0px;padding: 0px;border: none;width: 100%;height: 270px;overflow:hidden;"></iframe>';

var lnk = document.getElementById("ctl00_ContentBody_lnkTravelBugs");
	lnk = getRealNextSibling(lnk);
	lnk.appendChild(nat1_header);
	lnk.appendChild(nat1_inner);

function getRealNextSibling(ele) {
	ele = ele.nextSibling;
	while (ele.nodeType !=1) { ele = ele.nextSibling; } 
	return ele;
}

// Ein Dank an birnbaum2001 -> http://www.birnbaum2001.com/gccomment
function parseCoordinates(cstr) {
	var regexDegMin = /([NS])\s*(\d+)\D\s*(\d+\.\d+)\s*([EW])\s*(\d+)\D\s*(\d+\.\d+)/i;

	var fin = new Array();
	var items = regexDegMin.exec(cstr);
	if ((items != null) && (items.length == 7)) {
		var lat1 = RegExp.$2;
		while (lat1.indexOf(0) == 0) {
			lat1 = lat1.substring(1, lat1.length);
		}
		if (lat1.length == 0)
			lat1 = 0;

		var lat2 = RegExp.$3;
		var lat = parseInt(lat1) + parseFloat(lat2) / 60;
		if (RegExp.$1 == "S")
			lat = lat * -1;

		var lng1 = RegExp.$5;
		while (lng1.indexOf(0) == 0) {
			lng1 = lng1.substring(1, lng1.length);
		}
		if (lng1.length == 0)
			lng1 = 0;
		var lng2 = RegExp.$6;
		var lng = parseInt(lng1) + parseFloat(lng2) / 60;
		if (RegExp.$4 == "W")
			lng = lng * -1;

		fin.push(lat);
		fin.push(lng);
		return fin;
	}

	var regexPlain = /(\d+)\s+(\d+\.\d+)\s+(\d+)\s+(\d+\.\d+)/i;
	items = regexPlain.exec(cstr);
	if ((items != null) && (items.length == 5)) {
		var lat1 = RegExp.$1;
		while (lat1.indexOf(0) == 0) {
			lat1 = lat1.substring(1, lat1.length);
		}
		if (lat1.length == 0)
			lat1 = 0;

		var lat2 = RegExp.$2;
		var lat = parseInt(lat1) + parseFloat(lat2) / 60;

		var lng1 = RegExp.$3;
		while (lng1.indexOf(0) == 0) {
			lng1 = lng1.substring(1, lng1.length);
		}
		if (lng1.length == 0)
			lng1 = 0;
		var lng2 = RegExp.$4;
		var lng = parseInt(lng1) + parseFloat(lng2) / 60;
		fin.push(lat);
		fin.push(lng);
		return fin;
	}

	var regexDec = /(\d+\.\d+)(,\s*|\s+)(\d+\.\d+)/i;
	items = regexDec.exec(cstr);
	if ((items != null) && (items.length == 4)) {
		var lat1 = RegExp.$1;
		while (lat1.indexOf(0) == 0) {
			lat1 = lat1.substring(1, lat1.length);
		}
		if (lat1.length == 0)
			lat1 = 0;

		var lat = parseFloat(lat1);

		var lng1 = RegExp.$3;
		while (lng1.indexOf(0) == 0) {
			lng1 = lng1.substring(1, lng1.length);
		}
		if (lng1.length == 0)
			lng1 = 0;
		var lng = parseFloat(lng1);
		fin.push(lat);
		fin.push(lng);
		return fin;
	}

	return fin;
}