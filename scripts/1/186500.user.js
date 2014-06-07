// ==UserScript==
// @license     GPL 3.0
// @name        Load Flickr Originals To New Tabs
// @namespace   org.realityinfo
// @description Loads Original Sizes from Flikr Photostream into new tabs. 
// @match       *://*.flickr.com/photos/*
// @author      nacnud_uk27@yahoo.com
// @version     1
// @grant       GM_registerMenuCommand
// @grant       GM_openInTab
//
// ==/UserScript==

// Use this code legally. You accept all responsibility for your own actions.

// Just a note of what we did last...
var lastOpenURL = "";

function LoadFullSizeImagesIntoTabs ()
{
    var objLinks; 
    var intLinkCounter;
    var strCurrentHREF;
    var strMatch;

    // Get a list of all anchor elements.
    objLinks = document.getElementsByTagName('a');


    // If we have some to deal with
    if ( objLinks.length > 0 ) 
    {
        // Create our RegEx Filter
        var regex = /\/photos\/.*\/\d+/;
        // For each of those links we have to deal with
        for ( intLinkCounter = 0 ; intLinkCounter < objLinks.length ; intLinkCounter++ )
        {
            // Check if the currently captures HREF matches our REGEX!
            var match = objLinks[intLinkCounter].href.match(regex);
            if (match != null)
            {
                // Append the bit that gets us to the original sized image...
                urlToOpen = objLinks[intLinkCounter].href + "/sizes/o/in/photostream/";
                // If we've not opened this in the last iteration, open it now!                
                if (urlToOpen != lastOpenURL )
                {
                    lastOpenURL = urlToOpen;
                    GM_openInTab(urlToOpen);
                }
            }
        }
    }
}

// Register the command with GreaseMonkey. 
GM_registerMenuCommand('Flickr: Open Original Images In Tabs', function (cmd) {
    LoadFullSizeImagesIntoTabs();
});
