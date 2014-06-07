// This is a Greasemonkey user script to remove the twitter widget.
// version 0.2 BETA
// 2010-12-07
// Copyright (c) 2010, Benno Richters
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Remove Twitter Widget
// @namespace     
// @description   Removes the Twitter Widget from any page
// @include       *
// ==/UserScript==

window.setTimeout(function() {
            var el;
        
            el = document.getElementById("twtr-widget-1");
            if (el) {
                el.style.display = "none";
            }
            
            el = document.getElementById("twidget1");
            if (el) {
                el.style.display = "none";
            }

        }, 60);
