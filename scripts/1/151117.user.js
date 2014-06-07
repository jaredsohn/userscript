// ==UserScript== //
// @name           Hide link to Google Play in Google toolbar
// @namespace      bars
// @description    Removes links to Google Play from toolbar at the top of all Google web-sites
// @version        1.0
// @license        BSD License
// @include        http://*.google.*
// @include        http://google.*
// @include        https://*.google.*
// @include        https://google.*

// ==/UserScript==

// total number of attempts
var removeAttemps = 50;

function removeEntries()
{
	removeAttemps = removeAttemps - 1;
	
    // remove "+You" entry from the toolbar
    var toolbarEntries = document.getElementsByClassName("gbzt");
    if (toolbarEntries && toolbarEntries.length)
    {
        for (var i = 0; i < toolbarEntries.length; i++)
            if (toolbarEntries[i] && toolbarEntries[i].nodeName == "A" && toolbarEntries[i].getAttribute("href"))
                if (toolbarEntries[i].getAttribute("href").indexOf("play.google.com") != -1)
                    toolbarEntries[i].parentNode.parentNode.removeChild(toolbarEntries[i].parentNode);
    }
}

// start attempts (repeat every 100 milliseconds)
setTimeout(function(){removeEntries()}, 100);