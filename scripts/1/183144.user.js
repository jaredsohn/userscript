// IMDB2RT
// version 0.5 BETA!
// 2012-10-31
// Copyright (c) 2012, Arias
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
// select "IMDB2RT", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript== 
// @name			IMDB2RT
// @version			0.5
// @namespace			wip
// @description			For easy access to RT from imdb
// @include			http://www.imdb.com/title/*
// @include			https://www.imdb.com/title/*
// @run-at			document-end
// ==/UserScript== 

var infoBar = document.querySelector('#overview-top .infobar');

var Span = document.createElement('span');
Span.innerHTML = ' | ';

// Uggly way of getting imdb-ID
var imdbID = document.URL.substring(28,35);

var Element = document.createElement('a');

// href for searching with the imdb-ID
Element.href = 'http://www.rottentomatoes.com/alias?type=imdbid&s=' + imdbID;

Element.textContent = 'RT';
Element.setAttribute('target','_blank');

infoBar.appendChild(Span);
infoBar.appendChild(Element);