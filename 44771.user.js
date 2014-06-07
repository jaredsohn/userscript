// Goodreads Local Library Search
// Copyright (c) 2009, Iain Mullan
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
// --------------------------------------------------------------------
//
// RELEASE NOTES
// 0.1 Adds a link to the 'find at' section on a book page to search Boroondara library by Title
//
// ==UserScript==
// @name           Goodreads Local Library Search
// @namespace      http://ebotunes.com
// @include        http://www.goodreads.com/book/show/*
// ==/UserScript==


var base_url = 'http://boroondara.spydus.com/cgi-bin/spydus.exe/ENQ/OPAC/BIBENQ?ENTRY_NAME=TI&ENTRY=';

var title = document.getElementById('bookPageTitle').innerHTML;

var linksDiv = document.getElementById('affiliateLinks');

var full = document.createElement('span');
full.setAttribute('style', 'font-weight:bold');

var txtNode = document.createTextNode("Your Library...");
var link = document.createElement('a');
link.setAttribute('href', base_url+title);
link.setAttribute('target', '_blank');
link.appendChild(txtNode);


full.appendChild(document.createTextNode(' '));
full.appendChild(link);
full.appendChild(document.createTextNode(' | '));

linksDiv.insertBefore(full,linksDiv.childNodes[3]);
