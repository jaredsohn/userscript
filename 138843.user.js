// **********************************************************************
// ==UserScript==
// @name           HP VMS Doc Improver
// @namespace      http://www.eclecticeel.com/
// @description    v1.1 - Enlarges/emboldens headers in HP's online VMS documentation.
// @include        http://h71000.www7.hp.com/*
// ==/UserScript==
// **********************************************************************
// HP VMS Documentation Improver v1.1
// Chris Wesling
//
// This script enlarges the section headings in HP's online VMS
// documentation, to make them more noticeable.
//
// Changes:
// v1.1 (6-Oct-2008) - added padding-top to headers to improve spacing.
// v1.0 (8-Jul-2008) - enlarges h2/h3/h4 and makes them bold.
//
// Future development plans:
// * Fix tables to use whole width of screen. Tables of width 740 should
//   be 92.5%, width 720 should be 90%.
// **********************************************************************

// Get the last <head> element, if there's more than one, to make sure a
// later one doesn't override us.

var allHeads = document.evaluate(
	'//head',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null );

var i = allHeads.snapshotLength - 1;
var aHead = allHeads.snapshotItem(i);

// Redefine the h2, h3, and h4 size and/or weight.

var buffer = '<style> <!-- ';
buffer += 'h2 {font-size: 12pt; font-weight: bold; padding-top: 12pt;}';
buffer += 'h3 {font-size: 11pt; font-weight: bold; padding-top: 9pt;}';
buffer += 'h4 {font-weight: bold; padding-top: 6pt;}';
buffer += ' --> </style>';

// Stick it at the end of the <head> element.

aHead.innerHTML += buffer;