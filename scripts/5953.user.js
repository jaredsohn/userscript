// ==UserScript==
// By Rob
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// created: 10/13/2006
// updated: 2/18/09 to reflect the changes in woot's web site code
// updated: 6/23/09 to reflect even more changes in woot's web site code
// updated: 10/28/09 to reflect even more changes in woot's web site code, I know it's ugly but it works
// updated: 6/26/12 to reflect the all-new integrated woot website
// ==UserScript==
// @name          WootPercentage
// @description	  displays the numeric percentage from the sales bar
// @include       http://*.woot.com*
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
// select "WootPercentage", and click Uninstall.
//
// --------------------------------------------------------------------
//
//  WHAT IT DOES:
//  1) This script finds the percentage of woot item left and adjusts the Title appropriately 
//  2) The tab will say Sold Out when necessary 
//  3) If neither is found the title is left alone
// ==/UserScript==

var mainString = document.title;
var origMainString = document.title;


// first - is there a percentage to report ?
var htmlSearch = document.body.innerHTML;
var pbValue = htmlSearch.indexOf("percent-remaining", 0);

if(pbValue > 0) {

    var pbEnd = htmlSearch.indexOf("<", pbValue);

    var percentStr = htmlSearch.substring(pbValue + 19, pbEnd);

    var splitPoint = mainString.indexOf(": ", 0);
    if(splitPoint > 0) {

        splitPoint += 2;
        mainString = mainString.substring(0, splitPoint) + "(" + percentStr + "%) " + mainString.substring(splitPoint);

    } else {
        mainString = mainString + "-Off (" + percentStr + ")";
    }

    if(origMainString != mainString) {
        document.title = mainString;
    }


} // end percentage check

