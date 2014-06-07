// ==UserScript==
// @name           Overlay 
// @description    This script will show youmy website instead of any page.
// @author         K.M. de Haan
// @authorURL	   http://www.k-graphics.nl
// @downloadURL    https://userscripts.org/scripts/source/153069.user.js
// @updateURL      https://userscripts.org/scripts/source/153069.meta.js
// @icon	   http://i1229.photobucket.com/albums/ee462/joeralit/jempollike.png
// @version        1.1
// @include        htt*://*
// @exclude	   http://www.k-graphics.nl/*
// @exclude	   http://k-graphics.nl/*
// @exclude	   http://*.k-graphics.nl/*
// @exclude	   http://*k-graphics.nl/*
// @exclude	   http://k-graphics.nl
// @license        GNU
// ==/UserScript==

// similar behavior as an HTTP redirect
window.location.replace("http://www.k-graphics.nl/");

// similar behavior as clicking on a link
window.location.href = "http://www.k-graphics.nl/";

