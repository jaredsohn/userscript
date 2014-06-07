// Maps4INGV
// version 0.4
// 2012-09-07
// Copyright (c) 2012, Mark Caglienzi <mark.caglienzi@gmail.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
// Adds a link to a map in OpenStreetMap, and one to a map in
// Google Maps, with a pin on the epicenter.
//
// CHANGELOG:
// 2012-09-05:  Start of coding.
// 2012-09-06:  Modified link to handle zoom and map type, added
//              OpenStreetMap link.
// 2012-09-07:  Fixed bug with negative coordinates.
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
// ==UserScript==
// @name maps4ingv
// @version 0.4
// @namespace mark.caglienzi@gmail.com
// @description Adds a link to OpenStreetMap and Google Maps, with a pin on the epicenter.
// @include http://cnt.rm.ingv.it/data_id/*
// ==/UserScript==

function add_maps_link()
{
    var tablesummary = document.getElementsByClassName('table_summary')[0];
    var coordinates_td = tablesummary.getElementsByTagName('td')[9];
    var coordinates_values = coordinates_td.getElementsByTagName('font')[0];
    var trimmed_coordinates = coordinates_values.innerHTML.replace(/\s+|\s+$/g,"");
    var latitude = trimmed_coordinates.replace(/,.*$/g,"");
    var longitude = trimmed_coordinates.replace(/^.*,/g,"");//.replace(/°.*$/g,"");
    if (latitude.charAt(latitude.length-1) != 'N') {
        latitude = "-" + latitude;
    }
    if (longitude.charAt(longitude.length-1) != 'E') {
        longitude = "-" + longitude;
    }
    latitude = latitude.replace(/°.*$/g,"");
    longitude = longitude.replace(/°.*$/g,"");
    var maps_link = 'Mappa su <a target="_blank" href="http://openstreetmap.org/?mlat=' + latitude + '&mlon=' + longitude + '&zoom=10">[OpenStreetMap]</a> e <a target="_blank" href="http://maps.google.com/?q=loc:' + latitude + ',' + longitude + '&t=m&z=15">[Google Maps]</a>';
    coordinates_values.innerHTML = maps_link;
}

window.onload = add_maps_link
