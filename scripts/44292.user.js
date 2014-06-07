// EOL Ads killer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
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
// @name          EOL Ads Killer
// @description   Elotrolado.net Ads Killer
// @include       http://www.elotrolado.net/*
// ==/UserScript==

var allBanners, thisBanner;

allBanners = document.getElementsByClassName('section_left banners');

for (var i = 0; i < allBanners.length; i++) {
    thisBanner = allBanners[i];
    thisBanner.innerHTML = ''
}

document.getElementById('banner_top').innerHTML = '';
document.getElementById('publiright').innerHTML = '';
document.getElementsByClassName('banner')[0].innerHTML = '';
