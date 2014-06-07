// Ruby-Doc Reorganizer user script
// Copyright (c) 2008, Matt Hamilton
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
// select "Ruby-Doc Reorganizer", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ruby-Doc Reorganizer
// @namespace     matt@mthamil.org
// @description   Makes ruby-doc.org easier to use.
// @include       http://www.ruby-doc.org/core-1.8.6/*
// @include       http://www.ruby-doc.org/core-1.8.7/*
// @include       http://www.ruby-doc.org/core-1.9/*
// @include       http://ruby-doc.org/core-1.8.6/*
// @include       http://ruby-doc.org/core-1.8.7/*
// @include       http://ruby-doc.org/core-1.9/*
// ==/UserScript==

// Move frames to side.
var framesets = window.document.getElementsByTagName('frameset');
for (var i = 0; i < framesets.length; i++)
{
    var frameset = framesets[i];
    if (frameset.cols == "")
    {
        frameset.rows = "";
        frameset.cols = "20%, 80%";
    }
    else if (frameset.rows == "")
    {
        frameset.cols = "";
        frameset.rows = "100%";
    }
}

// Remove pointless frames.
var fileFrames = window.document.getElementsByName('Files')
if (fileFrames != null && fileFrames.length > 0)
   fileFrames[0].parentNode.removeChild(fileFrames[0]);

var methodFrames = window.document.getElementsByName('Methods')
if (methodFrames != null && methodFrames.length > 0)
   methodFrames[0].parentNode.removeChild(methodFrames[0]);
