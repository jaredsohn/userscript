// ==UserScript==
// @name           Neopets : Inventory Refresher
// @namespace      http://userscripts.org/users/59662
// @description    Automatically refreshes Inventory page
// @include        http://www.neopets.com/halloween/gamegraveyard.phtml
// ==/UserScript==

// Minimum refresh time (in seconds)
var refreshMin = 1;
// Maximum refresh time (in seconds)
var refreshMax = 10;

setTimeout(function()
{

    // Determine the number of seconds between min and max
    var randSpan = (refreshMax - refreshMin) + 1;
    // Random time between minimum and maximum
    var randTime = Math.floor(Math.random() * randSpan) + refreshMin;
    // Convert seconds to milliseconds
    var randTimeMS = randTime * 1000;
    
    window.setInterval('location.reload()', randTimeMS);
    
    return true;
},0);