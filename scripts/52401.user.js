// ==UserScript==
// @name           Navica google maps address linkage
// @namespace      http://userscripts.org/users/43921
// @description    Converts the address field for a Navica property page to a google maps link
// @include        http://*.navica2.net/*
// ==/UserScript==

var gmaps_str ="http://maps.google.com/maps?geocode=&q="
var td1=document.getElementById("expanded-address-label");
var newlink = document.createElement("a");
newlink.href = gmaps_str+td1.childNodes[0].nodeValue;
newlink.innerHTML = td1.childNodes[0].nodeValue;
td1.replaceChild(newlink,td1.childNodes[0]);