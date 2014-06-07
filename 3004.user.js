// Skandiabanken Accountnames
// version 0.1
// 2006-01-25
// Copyright (c) 2006, Eric Persson
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
// select "Skandiabanken Accountnames", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Skandiabanken Accountnames
// @namespace     http://www.persson.tm
// @description   Add names to your accounts at Skandiabanken.
// @include       https://www.skandiabanken.se/skbsecure/engagemang.aspx
// ==/UserScript==


// Define your accounts below.
var accounts = new Array(
    Array('9150-XXX.XXX-X', 'Savings account'),
    Array('9150-XXX.XXX-X', 'Spending account')
    );


window.addEventListener ( 'load',
    function() {
        var body = new String;
        body = document.body.innerHTML;
        
        for( i in accounts ){
            body = body.replace('>'+accounts[i][0]+'<', '>'+accounts[i][0]+' '+accounts[i][1]+'<');
        }
        
        body = body;
        document.body.innerHTML = body;
    }, true

);

