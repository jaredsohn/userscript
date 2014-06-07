// #########################      A simple Greasemonkey script that
// # Restore Google Navbar #    restores the white Google Navbar to
// #########################    its former glory.
// 
// --------------------------------------------------------------------
// 
//  This is a Greasemonkey user script. To install this script, you
//  need Greasemonkey version 0.3 or later. To get Greasemonkey, or
//  for more information go to http://greasemonkey.mozdev.org/
//  Greasemonkey is a Mozilla Firefox add-on that allows users to
//  make on-the-fly changes to HTML web page content through the use
//  of JavaScript. Greasemonkey scripts can add new functions to web
//  pages, fix rendering bugs, combine data from multiple webpages,
//  or perform numerous other functions.
// 
// --------------------------------------------------------------------
// 
// ## Greasemonkey Metadata ###########################################
// ==UserScript==
// @name          Googble Navbar Restoration
// @namespace     http://myjumbledweb.com/
// @description   Restore the white Google Navbar to its former glory.
// @include       http*://google.*/*
// @include       http*://*.google.*/*
// @exclude       
// @version       1.1b
// @history       1.1b Minor Revision: fixed browser compatibility issue
// @history       1.1  Addition: correct navbar menu's list-item spacing
// @history       1.0a Minor Revision: adjusted border color
// @history       1.0  Initial release
// ==/UserScript==
// ####################################################################

if (typeof(GM_log) == "function") {GM_log('Google Navbar GreaseMonkey Script Loaded');}

function addStyle(newStyle) {
    var styleElement = document.getElementById('style_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'style_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}

addStyle(
	'#gbi5 {'
    + '    background: url("//ssl.gstatic.com/gb/images/b_8d5afc09.png") repeat scroll -6px -22px transparent;'
    + '    height: 17px;'
    + '    width: 16px;'
    + '}'
    + '.gbz0l .gbtb2 {'
    + '    border-top-color: #1A54E1 !important;'
    + '}'
    + '#gbz .gbzt, #gbz .gbgt, #gbg .gbgt {'
    + '    color: #3366CC !important;'
    + '}'
    + '.gbz0l .gbts {'
    + '    color: #363636;'
    + '}'
    + '.gbzt-hvr, .gbzt:focus, .gbgt-hvr, .gbgt:focus {'
    + '    background-color: transparent;'
    + '    background-image: url("//ssl.gstatic.com/gb/images/b_8d5afc09.png");'
    + '    background-position: 0 -102px;'
    + '    background-repeat: repeat-x;'
    + '}'
    + '#gbx3, #gbx4 {'
    + '    background-color: #FFFFFF;'
    + '    background-image: url("//ssl.gstatic.com/gb/images/b_8d5afc09.png");'
    + '    background-position: 0 -138px;'
    + '    background-repeat: repeat-x;'
    + '    border-bottom: 1px solid #EDEDED;'
    + '}'
    + '#mngb #gbx4 {'
    + '    border-bottom: 1px solid #EDEDED;'
    + '}'
    + '.gbtb .gbts {'
    + '    background: url("//ssl.gstatic.com/gb/images/b_8d5afc09.png") repeat scroll 0 -22px transparent;'
    + '    padding: 29px 0 0;'
    + '    width: 1px;'
    + '}'
);

// Correct Navbar Menu's List-Item Spacing
addStyle(
      '.gbmt {'
    + '    padding: 0px 12px 0px 8px;'
    + '}'
    + '.gbmc {'
    + '    padding: 3px 0px;'
    + '}'
    + '.gbmh {'
    + '    margin: 3px 0px;'
    + '}'
);
