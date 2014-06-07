// Anti-Orlowskitron v0.1 by DaveK
// Copyright (c) 2009, Dave Korn
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
// select "Anti-Orlowskitron v0.1", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Anti-Orlowskitron v0.1
// @namespace     http://www.example.org/antiorlowskitron
// @description   Translates journotardese into blah.
// @include       http://theregister.co.uk/*
// @include       http://*.theregister.co.uk/*
// @include       http://theregister.com/*
// @include       http://*.theregister.com/*
// @include       http://reghardware.co.uk/*
// @include       http://*.reghardware.co.uk/*
// @include       http://channelregister.co.uk/*
// @include       http://*.channelregister.co.uk/*
// ==/UserScript==

var allbylines, byline, gotcha, body, allbodytexts, textelement, child;

gotcha = null;

allbylines = document.evaluate(
    "//p[@class='byline']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allbylines.snapshotLength; i++) {
    byline= allbylines.snapshotItem(i);
    // find bylines, check 'a' tags; should be one byline
    // with two links (mailto and archive search).
    bylinelinks = byline.getElementsByTagName('a');
    for (var j = 0; j < bylinelinks.length; j++) {
        if (bylinelinks[j].innerHTML.match(/Andrew Orlowski/)) {
            gotcha=bylinelinks[j];
            break;
        }
    }
}

if (gotcha != null) {
    gotcha.innerHTML=bylinelinks[j].innerHTML.replace(/Andrew Orlowski/,"Andrew 'Blah' Orlowski");
    // now process the body. assume only one for now.
    body = document.getElementById('body');
    allbodytexts = body.getElementsByTagName('p');
    for (var k = 0; k < allbodytexts.length; k++) {
        textelement = allbodytexts[k];
        // Enumerate all child nodes.
        for (var l = 0; l < textelement.childNodes.length; l++) {
            child = textelement.childNodes[l];
            // Now substitute it for something more interesting.  Future improvement:
	    // replace exact word-for-word/letter-by-letter case (preserving) with
            // same number of letters of 'blah'?
            if (child.nodeName == "#text")  {
                child.textContent = "Blah blah blah, blah blah blah blah.";
            }
        }
    }
}
