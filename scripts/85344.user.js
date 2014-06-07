// LJ Quote Fix user script
// version 1.1
// 20110928
// Copyright (c) 2010-2011 Phil Stracchino
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
// select "LJ Quote Fix", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           LJ Quote Fix
// @namespace      http://co.ordinate.org/
// @description    Changes the 'Quote' button on LJ-based sites to apply user-styled HTML rather than <q>
// @include        http://*.dreamwidth.org/*
// @include        http://*.livejournal.com/*
// ==/UserScript==

// Based upon simplified Dreamwidth code, and inspired by Andrew Ducker's
// LiveJournal Blockquote script, which did not work on Dreamwidth.  This
// script works correctly on either Dreamwidth or LiveJournal, and should
// work on any LiveJournal-compatible site.

var helped = 0;
var pasted = 0;
function newquote () {
    var text = '';
    var tag = 'blockquote';
    var textarea;

// The following example formats quoted text as a blockquote between vertical blue borders,
// with 500 pixels maximum width.  The style can be left empty if desired.
    var style = "style='border-style: solid none solid none; border-width: medium; border-color: blue; padding: 1em 0 1em 0; max-width: 500px'";


    if (document.getSelection) {
        text = document.getSelection();
    } else if (document.selection) {
        text = document.selection.createRange().text;
    } else if (window.getSelection) {
        text = window.getSelection();
    }


// fix for Safari
    if (typeof(text) == 'object') {
        text = text.toString();
    }

    text = text.replace(/^\s+/, '').replace(/\s+$/, '');	// Trim leading and trailing whitespace

    if (text == '') {
        if (helped != 1 && pasted != 1) {
            helped = 1; alert("If you'd like to quote a portion of the original message, highlight it then press 'Quote'");
        }
        return false;
    } else {
        pasted = 1;
    }



// The element ID of the comment text area on Dreamwidth appears to vary depending on whether
// we're quoting from an original post or a comment.  Why this should be is a mystery to me,
// but it means we need to check for both cases.

    textarea = document.getElementById('commenttext') || document.getElementById('body');

    textarea.value = textarea.value + "<" + tag + " " + style + ">" + text + "</" + tag + ">";

    textarea.caretPos = textarea.value;
    textarea.focus();
//    e.preventDefault();		// Not actually needed on Dreamwidth, but left in for LiveJournal compatibility
    return false;
}


// "I reject your quote() function and substitute my own!"

var nodes = document.evaluate("//input[@onclick=\"quote();\"]",
     document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < nodes.snapshotLength; i++) {
    var cur = nodes.snapshotItem(i);
    cur.setAttribute("onclick", "");
    cur.setAttribute("onmousedown", "");
    cur.addEventListener("click", newquote, false, false);
}

var nodes = document.evaluate("//input[@onmousedown=\"quote();\"]",
     document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < nodes.snapshotLength; i++) {
    var cur = nodes.snapshotItem(i);
    cur.setAttribute("onclick", "");
    cur.setAttribute("onmousedown", "");
    cur.addEventListener("mousedown", newquote, false, false);
}
