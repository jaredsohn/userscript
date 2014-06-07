// ==UserScript==
// @name           WoWInsider Sphere Removal
// @namespace      77087
// @description    Get Rid of the Shere content on WowInsider
// @include        http://www.wowinsider.com/*
var sphere1 = document.getElementById('sphereTalk');
if(sphere1)
{
  sphere1.parentNode.removeChild(sphere1);
}
var sphere2 = document.getElementById('sphereAd');
if(sphere2)
{
  sphere2.parentNode.removeChild(sphere2);
}
// ==/UserScript==
