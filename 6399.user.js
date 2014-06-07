// Google Code Search Line Numbers
// version 0.1
// 2006-11-15
// Copyright (c) 2006, Jim R. Wilson (gmail: wilson.jim.r)
// Released under The MIT License (http://www.opensource.org/licenses/mit-license.php)
//
// Purpose:
//    Adds line numbers to source code files served up by Google Code Search.
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
// ==UserScript==
// @name          Google Code Search Line Numbers
// @namespace     http://jimbojw.com/
// @description   Adds line numbers to Google Code Search result pages.
// @include       http://www.google.com/codesearch?*
// ==/UserScript==

/**
 * Custom style for line-numbers.
 */
var styleText = 
    "a.ln, div.toggle span { color: navy; background: #f0f0f0; padding: 0em 0.5em; border-right: 1px solid gray; }\n" +
    "div.toggle { border-bottom:1px solid gray; margin: 0em; padding: 0.25em; font-size: x-small; }\n" +
    "div.toggle span { border:1px solid gray; border-bottom: none; margin: 0em 0.5em; padding: 0.25em 0.5em; }\n" +
    "div.toggle span:hover { cursor: pointer; }\n" +
    "pre.source { margin-top:0em; }\n";
var style = document.createElement('style');
style.appendChild(document.createTextNode(styleText));
document.getElementsByTagName('head')[0].appendChild(style);

// Anonymous function wrapper
(function() {

/**
 * When the window is finished loading, add line numbers and finish the DOM.
 */
window.addEventListener('load', function(event) {

    // Setup - make sure there are enough pre tags, and that the desired on is the child of a td
    var pre = document.getElementsByTagName('pre')[2];
    if (!pre) return;
    var td = pre.parentNode;
    if (td.tagName.toLowerCase() != 'td') return;
    pre.className = 'source';
    pre.id = 'numberedSource';
    
    // Duplicate pre tag for toggle
    var preOrig = document.createElement('pre');
    preOrig.innerHTML = pre.innerHTML;
    preOrig.style.display = 'none';
    preOrig.className = 'source';
    preOrig.id = 'originalSource';
    td.appendChild(preOrig);
    
    // Inject line numbers    
    var lines = pre.innerHTML.split(new RegExp('^','m'));
    var width = (new String(lines.length)).length;
    for (var i=0; i<lines.length; i++) {
        var pad = new String(i + 1);
        while (pad.length < width) pad = '.' + pad;
        lines[i] = '<a class="ln" name="' + (i+1) + '">' + pad.replace(/\./g, '&nbsp;') + '</a> ' + lines[i];
    }
    pre.innerHTML = lines.join('');
    
    // Attach toggle tab
    td.innerHTML = '<div class="toggle"><span>Toggle Line Numbers</span></div>' + td.innerHTML;
    var span = td.getElementsByTagName('span')[0];
    span.addEventListener('click', function(clickEvent) {
        var pre = document.getElementById('numberedSource');
        var preOrig = document.getElementById('originalSource');
        if (pre.style.display == 'none') {
            preOrig.style.display = 'none';
            pre.style.display = 'block';
        } else {
            pre.style.display = 'none';
            preOrig.style.display = 'block';
        }
    }, 'false');

}, 'false');

})(); // end anonymous function wrapper