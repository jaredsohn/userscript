//{{GM}}<source lang="javascript">
// MS Report Server Fixes
// version 0.1
// 2006-12-14
// Copyright (c) 2006, Jim R. Wilson (wilson.jim.r at gmail)
// Released under The MIT License (http://www.opensource.org/licenses/mit-license.php)
//
// Purpose:
//    Tweaks Microsoft Report Server pages to render properly in Firefox.
//
// ==UserScript==
// @name          MS Report Server Fixes
// @namespace     http://jimbojw.com/userscripts/
// @description   Tweaks Microsoft Report Server pages to render properly in Firefox.
// @include       https://*/Reports/Reserved.ReportViewerWebControl.axd?*
// @include       http://*/Reports/Reserved.ReportViewerWebControl.axd?*
// @include       https://*/Reports/Pages/Report.aspx?ItemPath=*
// @include       http://*/Reports/Pages/Report.aspx?ItemPath=*
// ==/UserScript==

// Anonymous function wrapper
(function() {

/**
 * When the window is finished loading, start tweaking.
 */
window.addEventListener('load', function(event) {

    if (document.getElementsByTagName('iframe').length) {
        // Add a new style node to make sure all iframes are affected - even those not yet in the DOM.
        var style = document.createElement('style');
        style.appendChild(document.createTextNode('iframe{position:absolute;z-index:1}'));
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    if (document.getElementsByTagName('style').length) {
        // Grab the inline style element and filter out bad values.
        var styles = document.getElementsByTagName('style');
        for (var i=0; i<styles.length; i++) {
            var style = styles[i];
            style.innerHTML = style.innerHTML.replace(/overflow-x:hidden;?/,'');
        }
    }

}, 'false');

})(); // end anonymous function wrapper </source>