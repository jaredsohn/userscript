// ==UserScript==
// DagelijkseKostPrintLayout, view recepts in print layout
// version 0.2 BETA!
// 2012-09-30
// Copyright (c) 2009, myTselection.blogspot.com
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
// select "DagelijkseKostPrintLayout", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          DagelijkseKostPrintLayout
// @namespace     http://myTselection.blogspot.com
// @description   View recepts on Dagelijkse Kost in print layout
// @include       *een.be/programmas/dagelijkse-kost/recepten/*
// ==/UserScript==

//alert('Dagelijkse Kost');
function addStyle(style) {
var head = document.getElementsByTagName("HEAD")[0];
var ele = head.appendChild(window.document.createElement( 'style' ));
ele.innerHTML = style;
return ele;
}

addStyle('@import "/sites/een.be/themes/een/css/print.css";');