// Tucan logo replacement
// version 0.1
// 2011-06-23
// Copyright (c) 2011, Tobias Boehm
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// ==UserScript==
// @name          TU Darmstadt Tucan Logo Replacement
// @namespace     https://www.tucan.tu-darmstadt.de
// @description   Replaces the TU Darmstadt Tucan logo with the famous Tucan't logo
// @include       https://*.tucan.tu-darmstadt.de/*
// ==/UserScript==

var imageElement= document.getElementById("pageTopNavi");
imageElement.style.backgroundImage="url(http://i56.tinypic.com/1580bgh.png)";