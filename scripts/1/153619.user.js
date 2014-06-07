// ==UserScript==
// @name        Unsocial PoE
// @namespace   http://www.pathofexile.com/
// @description Removes the social networking bar at the top
// @include     http://*.pathofexile.com/*
// @version     1
// ==/UserScript==
//get the socialBar element 
var socbar = document.getElementById("socialBar");
//remove
if( socbar != null) { socbar.parentNode.removeChild(socbar); }