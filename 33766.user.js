// ==UserScript==
// @name          TheRegister Multi-page Printer Friendly Articles
// @description   Redirect to the print friendly version of the current TheRegister article if it's a multi-page article.  Based off of Dean Wilson's 'TheRegister Printer Friendly Articles'.
// @include       http://theregister.co.uk/*
// @include       http://www.theregister.co.uk/*
// @include       http://channelregister.co.uk/*
// @include       http://www.channelregister.co.uk/*
// @include       http://regdeveloper.co.uk/*
// @include       http://www.regdeveloper.co.uk/*
// @include       http://reghardware.co.uk/*
// @include       http://www.reghardware.co.uk/*
// ==/UserScript==
// $Id: elreg_multipage.user.js,v 1.10 2008/12/21 21:18:44 das Exp $

// Names to check
var itemChecks = ['pages-nav','page-nav','PageNum'];

// Locate and replace the window location with the 'print page' call
function locationReplace() {
    // replace with the print.html if it's page\d.html
    if (window.location.href.match(/page\d+.html/)) {
        var newUrl = window.location.href.replace(/page\d+.html/,
                                                    "print.html");
    } else {
        // or just append the print.html to the end of the URL
        var newUrl = window.location + "print.html";
    }
    // Use the new URL
    window.location.replace(newUrl);
}
    
// Check the item for ID match or class match
function checkItem(itmNm) {
    
    // Return false as default
    var rtnVal = false;

    // Get the element, if any, for a given ID
    var ele = document.getElementById(itmNm);
    
    // If there's an element with the ID name, return true
    if (ele) {
        rtnVal = true;
    } else {
        // Get the element count for a given class name
        ele = document.evaluate(
            "count(//div[@class=\'" + itmNm + "\'])",
            document,
            null,
            XPathResult.ANY_TYPE,
            null).numberValue;

        // If the class count > 0, set the return value to true.
        if (ele > 0) {
            rtnVal = true;
        } 
    }

    return rtnVal;
}

// If it's not the top level page and already in print mode to avoid loops, ...
if (! window.location.href.match(/\.co\.uk\/$/) &&
    ! window.location.href.match(/print.html/)) {

    // Cycle through the item IDs/classes to see if any match
    for (var i = 0; i < itemChecks.length; i++) {
        if (checkItem(itemChecks[i])) {
            locationReplace();
            break;
        }
    }
}
