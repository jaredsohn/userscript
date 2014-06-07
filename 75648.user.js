// Quick add Xbox Live codes
// version 1.0
// 1st May 2010
// Copyright (c) 2010, Aaron Harding
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
// select "Quickly add Xbox Live codes", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Quickly add Xbox Live codes
// @namespace     http://aerialdesign.co.uk/
// @description   Helps you add in Xbox Live Codes quickly.
// @include       https://live.xbox.com/en-US/accounts/RedeemToken.aspx
// ==/UserScript==

var ans = prompt("Enter in the 25 digit code WITH dashes:");
var codeSplit = ans.split("-");
document.getElementById('ctl00_ctl00_MainContent_MainContent_TokenInput_part0').value = codeSplit[0];
document.getElementById('ctl00_ctl00_MainContent_MainContent_TokenInput_part1').value = codeSplit[1];
document.getElementById('ctl00_ctl00_MainContent_MainContent_TokenInput_part2').value = codeSplit[2];
document.getElementById('ctl00_ctl00_MainContent_MainContent_TokenInput_part3').value = codeSplit[3];
document.getElementById('ctl00_ctl00_MainContent_MainContent_TokenInput_part4').value = codeSplit[4];