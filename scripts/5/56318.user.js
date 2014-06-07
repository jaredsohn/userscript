// ==UserScript==
// @name           Neopets : Advent Calendar Refresher
// @namespace      http://userscripts.org/users/104935
// @description    Automatically refreshes Advent Calendar Page
// @include        http://www.neopets.com/winter/adventcalendar.phtml
// ==/UserScript==

// Minimum refresh time (in seconds)
var refreshMin = 1;
// Maximum refresh time (in seconds)
var refreshMax = 2;

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