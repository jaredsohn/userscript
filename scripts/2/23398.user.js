// Delete junk from BBC homppage
// February 29th 2008
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         Delete BBC junk
// @description  delete various junk from the 'new' BBC homepage 
// @include       http://www.bbc.co.uk/

// ==/UserScript==

var deleteBbcJunkFeatureBox = document.getElementById('hpFeatureBox');
if (deleteBbcJunkFeatureBox) {
    deleteBbcJunkFeatureBox.parentNode.removeChild(deleteBbcJunkFeatureBox);
}

var deleteBbcJunkDirectory = document.getElementById('hpDirectory');
if (deleteBbcJunkDirectory) {
    deleteBbcJunkDirectory.parentNode.removeChild(deleteBbcJunkDirectory);
}

var deleteBbcJunkFooter = document.getElementById('hpFooter');
if (deleteBbcJunkFooter) {
    deleteBbcJunkFooter.parentNode.removeChild(deleteBbcJunkFooter);
}

var deleteBbcJunkBlqbanner = document.getElementById('blq-banner');
if (deleteBbcJunkBlqbanner) {
    deleteBbcJunkBlqbanner.parentNode.removeChild(deleteBbcJunkBlqbanner);
}

var deleteBbcJunkOptionsBar = document.getElementById('hpOptionsBar');
if (deleteBbcJunkOptionsBar) {
    deleteBbcJunkOptionsBar.parentNode.removeChild(deleteBbcJunkOptionsBar);
}


