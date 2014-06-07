// NewsFox RT Tweaks
// version 0.1
// 2006-11-06
// Copyright (c) 2006, Jim R. Wilson (wilson.jim.r at gmail)
// Released under The MIT License (http://www.opensource.org/licenses/mit-license.php)
//
// Purpose:
//    Tweaks the NewsFox Extension (http://newsfox.mozdev.org/) to make it an acceptable client
//    for viewing Best Practical's RT (http://bestpractical.com/rt) search result feeds.  It does so 
//    by injecting  CSS into relevant pages and other small modifications.
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
// select "Google Code Search Autocomplete", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          NewsFox RT Tweaks
// @namespace     http://jimbojw.com/userscripts/
// @description   Tweaks NewsFox (http://newsfox.mozdev.org/) into an acceptable viewer of RT (http://bestpractical.com/rt) search result feeds.
// @include       */Ticket/Display.html?id=*
// ==/UserScript==

// Anonymous function wrapper
(function() {

/**
 * Simple methods for retrieving the first instance of a tag.
 */
function first (tag, elem) {
    return (elem ? elem : document).getElementsByTagName(tag)[0];
}

/**
 * Wrapper method for injecting content into the document body ( GM_xmlhttpRequest has a tough time doing this on its own).
 */
function inject (tag) {
    first('body').appendChild(tag);
}

/**
 * Custom style for preview frame.
 */
var styleText = 
    "#nav, #logo, #quickbar { display: none; }\n" +
    ".ticket-summary, .titlebox-title { display: none; }\n" +
    "div.titlebox div { padding: 0em; margin-top: -5.5em; margin-left: -1em; }\n" +
    "div.titlebox div div.downloadattachment { margin: 0em; }\n" +
    "div.titlebox div + div { margin-left: -1em; margin-top: -1em; }\n" +
    "div.titlebox div div div { margin: 0em; }\n" +
    "div#footer { margin-top: -3em; }\n" +
    "div#header h1 { padding-bottom: 0.25em; }\n" +
    "div#header { padding: 0em; }\n";
var style = document.createElement('style');
style.appendChild(document.createTextNode(styleText));

/**
 * Hide document body until we're done augmenting the DOM.
 */
var hideBodyStyleText = "body#comp-Ticket-Display { visibility: hidden; }\n";
var hideBodyStyle = document.createElement('style');
hideBodyStyle.appendChild(document.createTextNode(hideBodyStyleText));
first('head').appendChild(hideBodyStyle);

/**
 * When the window is finished loading, start tweaking.
 */
window.addEventListener('load', function(event) {

    // Check to see if this is a rt ticket page and that it's inside a parent window
    var bpscredits = document.getElementById('bpscredits');
    var ctd = document.getElementById('comp-Ticket-Display');
    if (bpscredits && ctd && window.top != window) {
    
        // Add style
        first('head').appendChild(style);
        
        // Set all link targets to '_blank'
        var bodydiv = document.getElementById('body');
        var links = bodydiv.getElementsByTagName('a');
        for (var i in links) {
            links[i].target='_blank';
        }

    }
    
    // Redisplay body
    first('body').style.visibility = 'visible';    
    
}, 'false');

})(); // end anonymous function wrapper
