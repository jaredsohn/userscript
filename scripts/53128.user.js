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
// select "Google Secure Pro", and click Uninstall.
//
// This is forced http on QXL site so the https problem should be solved for now / by Mads
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          forced http 
// @description   Forces http on pages that doesnt need https.
// @include       https://www.qxl.dk/accdb/Cafe/*
// @include       https://www.qxl.dk/Cafe/*
// @include       https://www.qxl.dk/MyPages/MyBuying*
// @include       https://www.qxl.dk/MyPages/MySelling*
// @include       https://www.qxl.dk/MyPages/Favorite*
// @include       https://www.qxl.dk/MyPages/Billing*
// @include       https://www.qxl.dk/pris*
// @include       https://www.qxl.dk/search*
// @include       https://www.qxl.dk/form/AddObj_Step2*
// @include       https://www.qxl.dk/MyPages/Personnal/ChangeEmail*


// ==/UserScript==
//

var url = window.location.href;
window.location.replace(url.replace(url.substring(0,7), 'http://'));



