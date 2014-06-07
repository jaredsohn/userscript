// ==UserScript==
// @name          Google Maps & Geode - Together At Last (gmap)
// @namespace     http://margolin.org
// @description	  Allows you to set your current location as seen by Geode on the Google Maps at a single click, via a 'Current Location' link next to the search button.
// @author        Gil Margolin
// @homepage      
// @include       http://maps.google.com/*
// @include       https://maps.google.com/*
// @include       http://*.maps.google.com/*
// @include       https://*.maps.google.com/*
// @include       https://local.google.com/*
// @include       http://local.google.com/*
// ==/UserScript==
var optionSpan = document.getElementById("leaf_solink");
if(optionSpan != null)
{
		optionSpan.innerHTML = "<a href=\"javascript:void(0);\" onclick=\"navigator.geolocation.getCurrentPosition(function(pos) {document.getElementById('q_d').value = pos.coords.latitude + ', ' + pos.coords.longitude;document.getElementById('q_form').submit();}); \">Current Position</a> "  + optionSpan.innerHTML;
		
}
