// eBay Forum Ctrl Enter Submits user script
// version 0.2.3
// 2008-02-08
// Copyright 2006-2008, thorbenhauer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// Partially based on and inspired by 
//
// Ctrl+Enter Submits
// version 0.4
// 2005-09-26
// home: http://clear.com.ua/projects/firefox/ctrl_enter
// Copyright (c) 2005, Tim Babych
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          eBay Forum Ctrl Enter Submits
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5068
// @include       http://forums*.ebay.tld/*thread.jspa?*
// @include       http://answercent*.ebay.tld/post!*.jspa?*
//                for Opera (which doesn't understand tld):
// @include       http://forums.ebay.com/*thread.jspa?*
// @include       http://forums.ebay.com.au/*thread.jspa?*
// @include       http://forums-be*.ebay.be/*thread.jspa?*
// @include       http://forums.ebay.ca/*thread.jspa?*
// @include       http://forums.ebay.fr/*thread.jspa?*
// @include       http://forums.ebay.com.hk/*thread.jspa?*
// @include       http://forums.ebay.in/*thread.jspa?*
// @include       http://forums.ebay.co.uk/*thread.jspa?*
// @include       http://forums.ebay.it/*thread.jspa?*
// @include       http://forums.ebay.com.my/*thread.jspa?*
// @include       http://forums.ebay.nl/*thread.jspa?*
// @include       http://forums.ebay.ph/*thread.jspa?*
// @include       http://forums.ebay.pl/*thread.jspa?*
// @include       http://forums.ebay.com.sg/*thread.jspa?*
// @include       http://forums.ebay.es/*thread.jspa?*
// @include       http://answercenter.ebay.com/post!*.jspa?*
// @include       http://answercenter.ebay.com.au/post!*.jspa?*
// @include       http://answercenter.ebay.ca/post!*.jspa?*
// @include       http://answercenter.ebay.com.hk/post!*.jspa?*
// @include       http://answercenter.ebay.com.my/post!*.jspa?*
// @include       http://answercenter.ebay.com.sg/post!*.jspa?*
// @include       http://answercenter.ebay.pl/post!*.jspa?*
// @include       http://answercentre.ebay.co.uk/post!*.jspa?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

var input = document.evaluate("//input[@name='doPost']", document, null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);   
if (input != null) {
    var tarea = document.getElementById("body01");
    tarea.addEventListener("keydown",
        function(event) {
	        if (event.keyCode == 13 && event.ctrlKey) {
	            input.click();
	        }
        }, false // true doesn't work in Opera
    );
}

})(); // function wrapper for Opera