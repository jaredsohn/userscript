// ==UserScript==
// @name           Landev Chat
// @namespace      http://www.desert-operations.it
// @include     http://*.desert-operations.it/*
// @include     http://desert-operations.it/*
// ==/UserScript==

GM_log(document.URL);
var newEle=document.createElement("FRAME");
newEle.id="landevChat";
newEle.src="http://landev.altervista.org/ufch/minichat.php"
var gfs = document.getElementById("gfs");
gfs.appendChild(newEle);
gfs.rows="*,12,180";