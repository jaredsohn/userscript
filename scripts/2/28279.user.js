
// Ceridian Auto-Password Changer
// version 0.1 BETA!
// 2008-06-10
// Copyright (c) 2008, Michael Foss
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
// select "Ceridian Auto-Password Changer", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ceridian Auto-Password Changer
// @namespace     http://www.matatechconsulting.com/greasemonkey/
// @description   Automatically enters existing password on Ceridian password reset screen and disables the forcing of a password change.
// @include       https://cats.ceridian.com/index.cfm*
// ==/UserScript==

var CurrPin = document.getElementsByName('cOldPwd');
if (CurrPin != undefined) {
  CurrPin = CurrPin[0].value;
  var NewPin = document.getElementsByName('cPassword1')[0];
  var ReEnterPin = document.getElementsByName('cPassword2')[0];
  NewPin.value = CurrPin;
  ReEnterPin.value = CurrPin;
}

//
// ChangeLog
// 2008-06-10 - 0.1 - MLF - initial release
//
