// ==UserScript==
// @name           Tagged pets 2000 - 4 hours autoreload 
// @namespace      http://userscripts.org/users/92249
// @description    This script will reload Tagged Pets every 4 hours to gain 2,000
// @include        http://www.tagged.com/pets.html
// ==/UserScript==
// Based on Neopets: Inventory Refresher
// (http://userscripts.org/scripts/show/33159)


// Minimum refresh time (in seconds)
var refreshMin = 0;
// Maximum refresh time (in seconds)
var refreshMax = 59;

setTimeout(function()
{

    // Determine the number of seconds between min and max
    var randSpan = (refreshMax - refreshMin) + 1;
    // Random time between minimum and maximum
    var randTime = Math.floor(Math.random() * randSpan) + refreshMin;
    // Convert seconds to milliseconds
    var randTimeMS = (14400 + randTime) * 1000;
    
    window.setInterval('location.reload()', randTimeMS);
    
    return true;
},0);