// eBay Item Title Fix user script
// version 0.3.4
// 2008-02-22
// Copyright 2006-2008, thorbenhauer
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
// @name          eBay Item Title Fix
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5050
// @include       http://cgi*.ebay.tld/*
//                for Opera (which doesn't understand tld):
// @include       http://cgi.ebay.de/*
// @include       http://cgi.ebay.com/*
// @include       http://cgi.ebay.com.au/*
// @include       http://cgi.ebay.at/*
// @include       http://cgi.ebay.ca/*
// @include       http://cgi.ebay.fr/*
// @include       http://cgi.ebay.in/*
// @include       http://cgi.ebay.ie/*
// @include       http://cgi.ebay.com.my/*
// @include       http://cgi.ebay.nl/*
// @include       http://cgi.ebay.ph/*
// @include       http://cgi.ebay.com.sg/*
// @include       http://cgi.ebay.es/*
// @include       http://cgi.ebay.ch/*
// @include       http://cgi.ebay.co.uk/*
// @include       http://cgi.benl.ebay.be/*
// @include       http://cgi.befr.ebay.be/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

var matches, newTitle;
switch (document.domain.split("ebay.")[1]) {
    case "de":
    case "ch":
        matches = document.title.match(/(.*)\s\(endet\s+(.*)\)/);
        if (matches) {
            newTitle = matches[2] + " - " + matches[1];
        }
        break;
    case "at":
        matches = document.title.match(/(.*)\s\(Artikel\s([0-9]+)\sendet\s+(.*)\)/);
        if (matches) {
            newTitle = matches[3] + " - " + matches[1] + " - Artikel " +
                matches[2];
        }
        break;
    case "com":
    case "in":
    case "ie":
    case "com.my":
    case "ph":
    case "com.sg":
        matches = document.title.match(/(.*)\s\(item\s([0-9]+)\send\stime\s+(.*)\)/);
        if (matches) {
            newTitle = matches[3] + " - " + matches [1] + " - item " +
                matches[2];
        }
        break;
    case "ca":
        matches = document.title.match(/(.*)\s\(eBay.ca\sitem\s([0-9]+)\send\stime\s+(.*)\)/);
        if (matches) {
            newTitle = matches[3] + " - " + matches [1] + " item " + matches[2];
        }
        break;
    case "com.au":
    case "co.uk":
        matches = document.title.match(/(.*)\s\(end\stime\s+(.*)\)/);
        if (matches) {
            newTitle = matches[2] + " - " + matches [1];
        }
        break; 
    case "fr":
        matches = document.title.match(/(.*)\s\(fin\sle\s+(.*)\)/);
        if (matches) {
            newTitle = matches[2] + " - " + matches [1];
        }
        break;
    case "nl":
        matches = document.title.match(/(.*)\s\(Eindtijd\s+(.*)\)/);
        if (matches) {
            newTitle = matches[2] + " - " + matches [1];
        }
        break;
    case "es":
        matches = document.title.match(/(.*)\s\(finaliza\sel\s+(.*)\)/);
        if (matches) {
            newTitle = matches[2] + " - " + matches [1];
        }
        break;
    case "be":
        var be = document.domain.split(".ebay.")[0].split("cgi.")[1];
        if (be == "benl") {
            matches = document.title.match(/(.*)\s\(object\s([0-9]+)\seindtijd\s+(.*)\)/);
        } else {
            matches = document.title.match(/(.*)\s\(objet\s([0-9]+)\sFin:\s+(.*)\)/);
        }
        if (matches) {
            newTitle = matches[3] + " - " + matches [1] + " - item " +
                matches[2];
        }
        break;
    default:
        break;
}
if (newTitle) {
    document.title = newTitle;
}

})(); // function wrapper for Opera