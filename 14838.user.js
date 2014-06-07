// 10bis Markup script
// version 1.1
// 2007-12-04
// Copyright (c) 2007, Alon Diamant
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "10bis Markup script", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          10bis Markup script
// @namespace     http://metacafe.com/10bis/
// @description   Script to color restaurants in the 10bis page according to amount of food ordered from it.
// @include       http://www.10bis.co.il/G4/list.asp
// ==/UserScript==

// TODO:
//
// Unite all of the searches into one function that receives a regexp, a color and maybe a "testing" function.

// --------------------------------------------------------------------
// Functions
// --------------------------------------------------------------------

// Get the previous sibling in the DOM hierarchy
function get_previoussibling(myNode)
{
    var someNode = myNode.previousSibling;

    while (someNode.nodeType != 1)
    {
        someNode = someNode.previousSibling;
    }

    return someNode;
}

// --------------------------------------------------------------------
// Main Code
// --------------------------------------------------------------------

var allSpans, thisSpan, myRegExp;

// Get all of the spans in the document that are of 'res_list_data_text' class -
// text that is data in the restaurant list
allSpans = document.evaluate(
    "//span[@class='res_list_data_text']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

// Create a regexp to search for prices
myRegExp = /^\d+ ש"ח/;

// Go over all of the spans we found
for (var i = 0; i < allSpans.snapshotLength; i++) 
{
    // Get the actual span
    thisSpan = allSpans.snapshotItem(i);

    //GM_log('looking at ' + thisSpan.innerHTML + '\n');
    
    // Make sure the string is of the %d ש"ח variety
    if (myRegExp.exec(thisSpan.innerHTML))
    {
         //GM_log('found a price: ' + thisSpan.innerHTML);

        // Get the previous sibling
        var previousSibling = get_previoussibling(thisSpan);
		 
        // Make sure it is an order section
        if (previousSibling.innerHTML == "סך הזמנה עד כה: ")
        {
            //GM_log('found an order!\n');

            // Get the order amount
            var arrPriceStrings = thisSpan.innerHTML.split(" ");
            var iPriceValue = parseInt(arrPriceStrings[0]);
			
            // If the order amount is not zero....
            if (iPriceValue != 0)
            {
                // Paint it red!
                //GM_log('order is not empty!\n');
                thisSpan.innerHTML = '<TABLE width=100% cellpadding=0 cellspacing=0><TR><TD BGCOLOR="#CC0000">' + thisSpan.innerHTML + '</TD></TR></TABLE>';
            }
        }
    }
}

// Get all of the spans in the document that are of 'res_list_data_text fire_red_text' class -
// text that is glowing red
allSpans = document.evaluate(
    "//span[@class='res_list_data_text fire_red_text']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

// Create a regexp to search for prices
myRegExp = /אין|חינם/;

// Go over all of the spans we found
for (var i = 0; i < allSpans.snapshotLength; i++) 
{
    // Get the actual span
    thisSpan = allSpans.snapshotItem(i);

    GM_log('looking at ' + thisSpan.innerHTML + '\n');
    
    // Make sure the string is of the אין variety
    if (myRegExp.exec(thisSpan.innerHTML))
    {
         GM_log('found a price: ' + thisSpan.innerHTML);

        // Get the previous sibling
        var previousSibling = get_previoussibling(thisSpan);
		 
        // Make sure it is the order minimum
        if (previousSibling.innerHTML == "מינימום הזמנה: ")
        {
            GM_log('found an order minimum that is nothing!\n');

            // Paint it blue!
            thisSpan.innerHTML = '<TABLE width=100% cellpadding=0 cellspacing=0><TR><TD BGCOLOR="#8888FF">' + thisSpan.innerHTML + '</TD></TR></TABLE>';
        }
        // Make sure it is the order minimum
        if (previousSibling.innerHTML == "משלוח: ")
        {
            GM_log('found an order minimum that is nothing!\n');

            // Paint it green!
            thisSpan.innerHTML = '<TABLE width=100% cellpadding=0 cellspacing=0><TR><TD BGCOLOR="#88FF88">' + thisSpan.innerHTML + '</TD></TR></TABLE>';
        }
    }
}