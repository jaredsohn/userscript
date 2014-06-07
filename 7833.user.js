// Libero.it Webmail Login Cleaner user script
// version 1.0
// 2007-03-08
// Copyright (c) 2007, Danilo Roascio
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// This script normalizes login textboxes' behaviour and locks the 
// mailserver used (otherwise random) to let Firefox correctly remember 
// entered username and password.
//
// SCRIPT CONFIGURATION:
//
// If you got a libero.it e-mail, the script is already configured 
// properly. Otherwise, if you need to check an inwind.it, iol.it or 
// blu.it email, you need to uncomment the corresponding couple of 
// lines below. You can also change the mirror server number (ranging
// from 1 to 20).
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Libero.it Webmail Login Cleaner
// @namespace      tag:danilo@roascio.fakemail.it,2007-03-08:LiberoMail
// @description    Normalizes login textboxes' behaviour and locks the mailserver used (otherwise random) to let Firefox correctly remember entered username and password.
// @include        http://*.libero.it-disabled/*
// ==/UserScript==
//
// --- CONFIGURATION START --------------------------------------------
//
// SERVER LOCK, CHANGE THIS NUMBER TO CHANGE MIRROR (default wpop6)
var r = '6'; 
//
// LIBERO.IT SETTINGS
var dstring = "libero.it";
var sstring = 'http://wpop' + r + '.libero.it/email.php';
//
// INWIND.IT SETTINGS
//var dstring = "inwind.it";
//var sstring = 'http://wpop' + r + '.inwind.libero.it/email.php';
//
// IOL.IT SETTINGS
//var dstring = "iol.it";
//var sstring = 'http://wpop' + r + '.iol.libero.it/email.php';
//
// BLU.IT SETTINGS
//var dstring = "blu.it";
//var sstring = 'http://wpop' + r + '.blu.libero.it/email.php';
//
// --- CONFIGURATION END, do not edit below this line ----------------

var allObj, thisObj, newAttr;

// remove fake password field 'fint' that shows 'Password' value
thisObj = document.getElementById('fint');
if (thisObj) {
	thisObj.parentNode.removeChild(thisObj);
}

thisObj = document.getElementById('ver');
if (thisObj) {
    var newAttr = document.createAttribute("style");
    newAttr.nodeValue = 'display: block;';
    thisObj.setAttributeNode(newAttr);
}

// get webmail's 'entra' button
allObj = document.evaluate(
    "//input[@name='Act_Login_fint']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
thisObj = allObj.snapshotItem(0);
if (thisObj == null) {
    // 'entra' button has a different name on liberomail.libero.it
    allObj = document.evaluate(
        "//input[@name='Act_Login']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    thisObj = allObj.snapshotItem(0);
}

// do not execute javascript for random server selection
if (thisObj != null)
    thisObj.removeAttribute('onclick');

// get webmail's form object
allObj = document.evaluate(
    "//form[@name='webmail']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
thisObj = allObj.snapshotItem(0);

// manually set server
var newAttr = document.createAttribute("action");
newAttr.nodeValue = sstring;
thisObj.setAttributeNode(newAttr);

// get 'dominio' hidden input field
allObj = document.evaluate(
    "//input[@name='dominio']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
thisObj = allObj.snapshotItem(0);
thisObj.value = dstring;
