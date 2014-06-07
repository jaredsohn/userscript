// ==UserScript==
// @name           Remove ads from playr.co.uk Ontslaught 2
// @namespace      Happy to get my first script out there
// @description    Removes ads from ontslaught.playr.co.uk
// @version        0.1
// @author         Inception!
// @include        http://playr.co.uk/*
// @include        http://*.playr.co.uk/*
// ==/UserScript==

// First Script; if you got tips on doing it better please tell me.

// Remove Ads

ads = document.getElementById('google')
if (ads) ads.parentNode.removeChild(ads); 

//Quote from Inception (2010)
//Arthur: With the slightest disturbance, the dream's going to collapse.