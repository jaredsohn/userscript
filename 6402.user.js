// NewsFox dotProject Tweaks
// version 0.1
// 2006-11-15
// Copyright (c) 2006, Jim R. Wilson (wilson.jim.r at gmail)
// Released under The MIT License (http://www.opensource.org/licenses/mit-license.php)
//
// Purpose:
//    Tweaks the NewsFox Extension (http://newsfox.mozdev.org/) to make it an acceptable client
//    for viewing dotProject (http://www.dotproject.net/) feeds.  It does this by injecting  CSS 
//    into relevant pages and other small modifications.  Note: Requires a dotProject extension or
//    plugin which supports creation of RSS feeds since at this time dotProject does not have this
//    functionality natively.
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
// @name          NewsFox dotProject Tweaks
// @namespace     http://jimbojw.com/userscripts/
// @description   Tweaks NewsFox (http://newsfox.mozdev.org/) into an acceptable viewer of dotProject (http://www.dotproject.net/) feeds.
// @include       *index.php?m=tasks&a=view&task_id=*
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
    "body>table>tbody>tr>td>table:first-child { display:none; }\n" +
    "body>table:first-child { display: none; }\n" +
    "table { width: 0; }\n" +
    "table table+table, table.std, table.tbl { width: 100%; }\n" +
    "body>table { width: 0; }\n" +
    "form>table { width: 100%; }\n" +
    "td>strong:first-child { width: 100%; background: #006; border: 1px solid gray; color: white; \n" +
    "padding: 0em 0.5em 0.25em 0.5em; -moz-border-radius-topLeft: 1em; -moz-border-radius-topRight: 1em; }\n" +
    "table.std td>strong:first-child { border: inherit; color: inherit; background: inherit; \n" +
    "-moz-border-radius: inherit; padding: inherit; }\n" +
    "table.std>tbody>tr>td { float: left; width: 100%; }\n" +
    "table.std>tbody>tr>td table { padding-right: 1em; width: 100%; }\n" +
    "table.std>tbody>tr>td table table { padding-right: 0; width: 100%; }\n" +
    "table.std>tbody>tr>td:first-child tr td:first-child { width: 0%; white-space: nowrap; }\n" +
    "table.std>tbody>tr>td:first-child { width: 100%; padding-right: 1em; }\n" +
    "table.std>tbody>tr>td:first-child tr td:last-child { width: 100%; }\n" +
    "table.std td + td table td.hilite { border: 1px solid black; padding: 1em; }\n" +
    "table.std td + td table table>tbody>tr>td.hilite { border: none; padding: inherit; }\n" +
    "table.std td + td table tr + tr + tr + tr + tr + tr+ tr + tr + tr + tr>td.hilite { padding: inherit; }\n" +
    "";
var style = document.createElement('style');
style.appendChild(document.createTextNode(styleText));

/**
 * Hide document body until we're done augmenting the DOM.
 */
var hideBodyStyleText = "body { visibility: hidden; }\n";
var hideBodyStyle = document.createElement('style');
hideBodyStyle.appendChild(document.createTextNode(hideBodyStyleText));
first('head').appendChild(hideBodyStyle);

/**
 * When the window is finished loading, start tweaking.
 */
window.addEventListener('load', function(event) {

    // Check to see if this page is inside a parent window
    if (window.top != window) {

        // Add style
        first('head').appendChild(style);

        // Set all link targets to '_blank'
        var links = document.getElementsByTagName('a');
        for (var i in links) {
            links[i].target='_blank';
        }
    }
    first('body').style.visibility = 'visible';    
    
}, 'false');

})(); // end anonymous function wrapper

