// eBay Forum Accesskey user script
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
// Google Search Box AccessKey
// http://userscripts.org/scripts/show/4027
// Copyright (c) Gary Mason 
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
// @name          eBay Forum Accesskey
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5072
// @include       http://forums*.ebay.tld/*
// @include       http://answercent*.ebay.tld/*
//                for Opera (which doesn't understand tld):
// @include       http://forums.ebay.com/*
// @include       http://forums.ebay.com.au/*
// @include       http://forums-be*.ebay.be/*
// @include       http://forums.ebay.ca/*
// @include       http://forums.ebay.fr/*
// @include       http://forums.ebay.com.hk/*
// @include       http://forums.ebay.in/*
// @include       http://forums.ebay.co.uk/*
// @include       http://forums.ebay.it/*
// @include       http://forums.ebay.com.my/*
// @include       http://forums.ebay.nl/*
// @include       http://forums.ebay.ph/*
// @include       http://forums.ebay.pl/*
// @include       http://forums.ebay.com.sg/*
// @include       http://forums.ebay.es/*
// @include       http://answercenter.ebay.com/*
// @include       http://answercenter.ebay.com.au/*
// @include       http://answercenter.ebay.ca/*
// @include       http://answercenter.ebay.com.hk/*
// @include       http://answercenter.ebay.com.my/*
// @include       http://answercenter.ebay.com.sg/*
// @include       http://answercenter.ebay.pl/*
// @include       http://answercentre.ebay.co.uk/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

var form = document.evaluate("//form[@name='postform']", document, null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if (form != null) {
    // Opera
    var tarea = document.evaluate("//textarea[@id='body01']", document, null, 
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    tarea.setAttribute("accesskey", "i");
    // Firefox (Bug: accesskey can't be attached directly to the textarea)
    var newLabel = document.createElement("label");
    newLabel.setAttribute("for", "body01");
    newLabel.setAttribute("accesskey", "i");
    form.appendChild(newLabel);
}

})(); // function wrapper for Opera