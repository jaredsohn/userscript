// ==UserScript==
// @name WME: Select Same Type Roads OLD
// @description This script select roads which have the same type.
// @namespace http://www.tay-tec.de/waze-street-to-river
// @updateURL https://userscripts.org/scripts/source/158050.user.js
// @match https://world.waze.com/editor/*
// @match https://www.waze.com/editor/*
// @match https://world.waze.com/map-editor/*
// @match https://www.waze.com/map-editor/*
// @include		https://*.waze.com/editor/*
// @include		https://*.waze.com/map-editor/*
// @include		https://*.waze.com/beta_editor/*
// @include		https://descarte*.waze.com/beta/*
// @grant		none
// @version		3.5
// ==/UserScript==

// Based on Street to River ( http://userscripts.org/scripts/show/122049 )
// Thanks to alcolo47 (some functions are based on WME Extented Tools)
// Adapted by buchet37 for "Select Same Type Road"

// Mini howto:
// 1) install this script as greasemonkey script or chrome extension
// 2) Select 2 segments 
// 3) Click the "Select Roads A<=>B" button
// The script will select all same type road between A and B with a limit of 50 segments
