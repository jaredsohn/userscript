// ==UserScript==
// @name           GoogleMapSize
// @description	   Give GoogleMaps a little more vertical space
// @include        http://maps.google.*/*
// ==/UserScript==

var user = document.getElementById("guser");
var spacer = document.createElement("nobr");
spacer.innerHTML=" | ";
user.insertBefore(spacer,user.firstChild);
var hide = document.createElement("a");
hide.setAttribute("href","javascript:void(0)");
hide.setAttribute("onclick","var hdr = document.getElementById('header');hdr.style.display = (hdr.style.display != 'none') ? 'none' : 'inline';resizeApp();");
hide.innerHTML="(un)hide";
user.insertBefore(hide,user.firstChild);
