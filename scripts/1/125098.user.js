// Allow University of Edinburgh passwords
// version 0.1
// 2012-02-07
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// If you want, you can configure the Included and Excluded pages in 
//  the GreaseMonkey configuration.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Allow Password Remembering", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Allow ed.ac.uk passwords
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Removes autocomplete="off" attributes
// @include         http://*.ed.ac.uk/*
// @include         https://*.ed.ac.uk/*
// ==/UserScript==


for(var i = 0, l = document.getElementsByTagName('input').length; i < l; i++) {
    if(document.getElementsByTagName('input').item(i).type == 'text') {
        document.getElementsByTagName('input').item(i).setAttribute('autocomplete', 'on');
    }
}