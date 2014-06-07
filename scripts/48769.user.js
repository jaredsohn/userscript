// ==UserScript==
// @name          Tibia Forum Expand
// @namespace     http://www.erig.net/
// @description   Gives Tibia's forums more room!
// @include       http://forum.tibia.com/*
// @version       0.1
// @author        Erig (http://www.erig.net/)
// ==/UserScript==

// --------------------------------------------------------------------
//
// To install, you need FireFox http://www.mozilla.org/products/firefox and 
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tibia Forum Expand", and click Uninstall.
//
// --------------------------------------------------------------------


(function() {
    if (document.getElementById('ThemeboxesColumn')) {
        document.getElementById('ThemeboxesColumn').style.display = 'none';
    }

    if (document.getElementById('ContentColumn')) {
        document.getElementById('ContentColumn').style.marginLeft = 160;
        document.getElementById('ContentColumn').style.marginRight = -20;
    }

    if (document.getElementById('MenuColumn')) {
        document.getElementById('MenuColumn').style.marginLeft = -20;
    }

})();