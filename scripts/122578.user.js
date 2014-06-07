// ==UserScript==
// @name           fridge
// @namespace      Tharvik
// @description    A script to add magnet and maggot links to I2PSnark
// @include        http://*.i2p/*
// @include        http://localhost:7657/i2psnark/*
// @version        0.1.0.05
// @grant          none
// ==/UserScript==

// Change Log:
//  0.1.0.05
//    Add support of some webkit to allow the click() to work
//
//  0.1.0.04
//    Add support for the normal .torrent links
//
//  0.1.0.03
//    Change the handling of post page to keep up with I2Psnark changes
//    Remove "makePOSTPage" function, not used anymore
//
//  0.1.0.02
//    Add the support of maggot links, improvement in JavaScriptic
//
//  0.1.0.01
//    Remove the auto-updater, causing troubles
//
//  0.1.0
//    Initial, working version

// Configuration
linkToWebTorrent = "http://localhost:7657/i2psnark/" // Change in the GreaseMonkey @include

// Functions

// Return:
//  1    if we are on the I2PSnark page
//  2    if we are our own I2PSnark page
//  3    if we are elsewhere
function webTorrentPage ()
{
    if (linkToWebTorrent + "_post" == "http://" + location.host + location.pathname)
    {
        return 2;
    }

    if (linkToWebTorrent == "http://" + location.host + location.pathname)
    {
        return 1;
    }

    else
    {
        return 3;
    }
}

// Get all the wanted links
function getMagnets ()
{
    // Get all the links ("a" tag)
    var links   = document.getElementsByTagName ("a");
    var magnets = [];
    
    for (var i = 0; i < links.length; i++)
    {
        // Get only the "magnet:*", "maggot:*" and "*.torrent" links
        if (links [i].href.match (/magnet:.*|maggot:.*|.*\.torrent/))
        {
            // Add the link to the magnet array
            magnets.push (links[i]);
        }
    }

    return magnets;
}

// Change all the links
function changeMagnets (magnets)
{
    for (var i = 0; i < magnets.length; i++)
    {
        // Change the link to our own system
        magnets [i].href    = linkToWebTorrent + "#" + magnets [i].href;
        magnets [i].target  = "_blank";
    }
}

// Add to I2PSnark by adding to the input and simulate a click
function addToWebTorrent ()
{
    var magnet = location.hash.slice (1);

    if (magnet != "")
    {   
        // Get the path to the input
        path = document.evaluate ("//input[@name='newURL']", document, null, XPathResult.ANY_TYPE, null);
        
        // Change input value
        path.iterateNext().value = magnet;

	// Click the button
        path = document.evaluate ("//input[@name='foo']", document, null, XPathResult.ANY_TYPE, null);
        path.iterateNext().click();


    }
}

// Launch other functions, dummy to let the whole page load
function main ()
{
    switch (webTorrentPage ())
    {
        case 1 :
            addToWebTorrent ();
            break;
        
        case 2 :
            close ();
            break;
        
        case 3 :
            var magnets = getMagnets ();
            changeMagnets (magnets);
            break;
    }
}

// Init
main ();
