// ==UserScript==
// @name        Direct Photobucket
// @namespace   pb
// @description Redirects the page to the direct picture.
// @include     http://*.photobucket.com/*
// @version     1
// @grant       none
// @author	Lee Davies
// @homepage	http://www.leedavies87.co.uk
// ==/UserScript==
var pb = document.getElementById("linksModule_ccinput_1").value;
var a = pb.indexOf("mp4");
if( a < 0)
{
  window.location = pb;
}
