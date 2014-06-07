// ==UserScript== //
// @name           Hide links to Google+
// @namespace      bars
// @description    Removes links to Google+ from toolbar at the top of all Google web-sites and from the account menu
// @version        1.0.3
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
                if (toolbarEntries[i].getAttribute("href").indexOf("plus.google.com") != -1)
                    toolbarEntries[i].parentNode.parentNode.removeChild(toolbarEntries[i].parentNode);
    }
    
    // remove "personal results" from the results page
    var personalResultsBars = document.getElementsByClassName("ab_center_col");
    if (personalResultsBars && personalResultsBars.length)
        for (var i = 0; i < personalResultsBars.length; i++)
            personalResultsBars[i].parentNode.removeChild(personalResultsBars[i]);
    
    // remove "Google+" link from the footer on some Google sites
    var footer = document.getElementById("fll");
    if (footer)
    {
        var links = footer.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++)
            if (links[i] && links[i].getAttribute("href"))
                if (links[i].getAttribute("href").indexOf("plus.google.com") != -1)
                    links[i].parentNode.removeChild(links[i]);
    }
    
    // remove blue bar with Google+ advertisement
    var joinBar = document.getElementById("gbprw");
    if (joinBar)
        joinBar.parentNode.removeChild(joinBar);
    
    // remove "Join Google+" entry from the account menu
    var joinEntry = document.getElementById("gbmplp");
    if (joinEntry)
        joinEntry.parentNode.parentNode.removeChild(joinEntry.parentNode);
	
	if (removeAttemps > 0)
		setTimeout(function(){removeEntries()}, 100);
}

// start attempts (repeat every 100 milliseconds)
setTimeout(function(){removeEntries()}, 100);