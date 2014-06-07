// Facepunch Old Logo
// version 0.1 BETA!
// By Tom Doyle
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select this script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facepunch Old Logo
// @namespace     http://facepunch.com
// @description   Replace facepunch's logo with the old one
// @include       http://facepunch.com/*
// @include       http://www.facepunch.com/*
// @include       http://*.facepunch.com/*
// @exclude       http://www.facepunch.com/login.php
// @exclude       http://www.facepunch.com/showpost.php?p=*
// @exclude       http://facepunch.com/login.php
// @exclude       http://facepunch.com/showpost.php?p=*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#navbar { margin-top:0px ! important; border-top:0px ! important;} div#spacer { margin:0px ! important; padding:0px! important;');


var logo = document.createElement("div");
logo.innerHTML = '<div class="logoa" style=" height:38px; padding:0px; margin:0px; padding-left:17px;"><a href="index.php"><img src="http://tdoyle.me/img/files/logoa.png" width=150 height=38 /></a></div>';
document.body.insertBefore(logo, document.body.firstChild);

document.getElementById('navbarimg').innerHTML = '<a href="index.php"><img src="http://tdoyle.me/img/files/logob.png" alt="logo" /></a>';