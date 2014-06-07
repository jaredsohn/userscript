// ==UserScript==
// @name          Feuerwache.net Banner Resize
// @namespace     http://userscripts.org/users/125700
// @description   Darstellung vom Feuerwache.net Banner (vehicle-logo.jpg) wird verkleinert
// @include       http://www.feuerwache.net/*
// @author        MasterJM
// @version       2010-06-03 01:05
// ==/UserScript==

function addStyle(css) {
   GM_addStyle(css.replace(/;/g,' !important;'));
 }

addStyle('#logoVehicle {height: 80px;}');
addStyle('#navigation_top {height: 140px;}');
addStyle('#container {background-position:0 -90px;}');