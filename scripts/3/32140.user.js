// ==UserScript==
// @name          All Homes links to Google Maps
// @namespace     http://kstruct.com/AllHomes-GoogleMaps/
// @description   Shows Google links on All Homes
// @include       *www.allhomes.com.au/*
// ==/UserScript==

var target;

var list = document.getElementsByTagName('h1');

for (var i = 0; i < list.length; i++) {
    if (list[i].className == 'address') {
        target = list[i];
    }
}

var address = target.innerHTML;
var trimmedAddress = address.replace(/^\s+|\s+$/g, '') ;
target.innerHTML = address + " (<a href='http://maps.google.com.au/maps?iwloc=addr&q=" + escape(trimmedAddress) + "'>google map</a>)";