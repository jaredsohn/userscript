// Adding 'Region' to Google Analytics interface.
// version 1.0
// 2009-05-13
// Copyright (c) 2009, Axel Queffeulou
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Regions everywhere in Google Analytics", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Regions everywhere in Google Analytics
// @description   This scripts allows you to have another drill down option in Geographic Overlay in Google Analytics : Region. Region was only available for US and was in fact a state. From now, you will be able to see regions for countries or continents wherever regions, provinces, territories or states exist.
// @include       https://www.google.com/analytics/reporting/*
// @exclude       https://www.google.com/analytics/reporting/*&d1=US*
// ==/UserScript==

var zoomControl_listing = document.getElementById('ZoomControl_listing');
var region = document.createElement('a');
var zoomMenuControl_listing = document.getElementById('ZoomMenuControl_listing');
var list = zoomMenuControl_listing.getElementsByTagName('ul')[0];
var li = document.createElement('li');
zoomControl_listing.innerHTML += '|';
region.href = "javascript:analytics.PropertyManager._getInstance()._broadcastChange(\"segment_by\",\"region\",\"0\")";
region.innerHTML = ' Region ';
zoomControl_listing.appendChild(region);
list.appendChild(li);
li.appendChild(region.cloneNode(true));