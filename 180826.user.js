// ==UserScript==
// @name        Unsocial Gamepedia
// @namespace   gamepedia.com
// @description Removes the social networking bullshit
// @include     *.gamepedia.com/*
// @version     1
// ==/UserScript==
//get the socialContainer element 
var soccon = document.getElementById("socialContainer");
//remove
if( soccon != null) { soccon.parentNode.removeChild(soccon); }