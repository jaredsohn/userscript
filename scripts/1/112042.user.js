// ==UserScript==
// @name           Blockbuster Queue UI Fixer
// @namespace      http://www.stealthmonkey.com
// @description    Cleans up the Blockbuster Queue user interface (making it more like Netflix) 
// @include        http*://www.blockbuster.com/browse/queuemgmt/fullQueue*
// @version        1.3
// ==/UserScript==

// Version 1.3:
//  - Fixed bug when Rent In Store count reached '10+'
//
// Version 1.2:
//  - Now hides advertisement to purchase a disc you have at home
//  - Made a few elements take up a little less space
//  - Changed script name from 'Clean Up Blockbuster Queue Interface' to 'Blockbuster Queue UI Fixer'
//  - Added versioning to script
//
// Version 1.1:
//  - Fixed script after Blockbuster changes
//
// Version 1.0:
//  - Initial release

// Fix Title
var titleElements = document.getElementsByClassName("title");
for (i = 0; i < titleElements.length; i++) {
    // Clean Up Rent In Store Text
    titleElements[i].innerHTML = titleElements[i].innerHTML.replace(/\<br\>Rent In Store\*\:[\s]*(\<a [^>]*\>)([^<]*)(\<\/a\>)[^[]*\[(\d{1,2}\+?) Cop[yies]*\]/, "<div class=\"inStoreCustom\">Rent In Store: $1$2$3 ($4)</div>");
    // Remove Attributes From Titles (e.g. [Blu-ray], [WS], [Special Eddition])
    titleElements[i].innerHTML = titleElements[i].innerHTML.replace(/\[.*?\]/g, "");
    // Remove Years From Titles
    titleElements[i].innerHTML = titleElements[i].innerHTML.replace(/\(\d{4}\)/, "");
}

// Fix Availability
var availabilityElements = document.getElementsByClassName("availability");
for (i = 0; i < availabilityElements.length; i++) {
    // Remove "Available", Highlight Remaining Statuses
    if (availabilityElements[i].innerHTML == "Available") {
        availabilityElements[i].innerHTML = "";
    }
    else {
        availabilityElements[i].innerHTML = "<strong>" + availabilityElements[i].innerHTML + "</strong>";
    }
}

// Makes Queue Info Sections Take Up Less Height
GM_addStyle("DIV.moviesShipped > DIV.queueInfo { margin-bottom: 0px !important; }");

// Hides 'Like this Title? Keep it for $x.xx'
GM_addStyle("DIV.disc > DIV.rlk { display: none !important; }");

// Removes MPAA Rating Column
GM_addStyle(".mpaa { display: none !important; }");

// Use Available Space Created By Removing MPAA Rating
GM_addStyle(".moviesShipped .title { width: 430px !important; }");
GM_addStyle(".moviesInQueue .title { width: 463px !important; }");
GM_addStyle(".moviesSaved .title { width: 543px !important; }");

// Make The Disk Separator Lines Slightly More Pronounced
GM_addStyle(".fQueue .queueList li { border-bottom: 1px solid #D0D0D0; }");

// Define In Store Text Style
GM_addStyle(".inStoreCustom { color: #707070; font-size: 7pt; }");
GM_addStyle(".inStoreCustom a { color: #707070; }");