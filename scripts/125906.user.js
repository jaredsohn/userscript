// piratenForschung
// v1.0000
//  
// 2012-02-16
// Copyright (c) 2009, 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Für lose5.piraten-battle.de
// Forschungsseite erweitern 
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
// select "piratenspio" and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          piratenForschung
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   piratenForschung
// @include       http://lose5.piraten-battle.de/*
// @exclude       
// ==/UserScript==


/// hauptprogramm

var expression; 
var allElements, thisElement,innertext,it,tabElements;
var Ergebnis,zwe;
var ganzinnen;
var dm=window.location.href;
var domain;
expression = /(http\:\/\/.*?\/)(.*?)/gim;  
if (expression.test(dm) == true) {domain=RegExp.$1;}
var Suche

var ta;
var tb;
var ht;


