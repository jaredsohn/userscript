// ==UserScript==
// @name	Geocaching.com reittiopas-integration
// @include	http://www.geocaching.com/seek/cache_details.aspx?*
// ==/UserScript==

var start_position = 'Kamppi'


var mapLinks_id = 'ctl00_ContentBody_MapLinks_MapLinks';
var wptcontainer_id = 'ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode';

mapLinks = document.getElementById(mapLinks_id);

if (navigator.appName.indexOf('Opera') == -1) {
    lat = unsafeWindow.lat;
    lng = unsafeWindow.lng;
}



var wptspan = document.getElementById(wptcontainer_id);

roli = document.createElement('li');
roa = document.createElement('a');
roa.href = 'http://fba.evvk.com/geo/reittiopas?lat=' + lat  + '&lon=' + lng + '&s=' + start_position + '&t=' + wptspan.innerHTML;
roa.innerHTML = 'Reittiopas';
roli.appendChild(roa);
mapLinks.appendChild(roli);