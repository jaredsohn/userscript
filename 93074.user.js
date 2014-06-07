// ==UserScript==
// @name          Universal Subtitles Enabler
// @namespace     urn:x-l2g.to:greasemonkey:USE
// @description   Enable Universal Subtitles on video websites
// @version       1.1
// @include       http://boingboing.net/*
// @include       http://www.html5video.org/*
// @include       http://www.wagn.org/*
// @include       http://www.youtube.com/*
// ==/UserScript==
//
// Last edition: 2010-12-19 (#2)
//
// This script inserts the special code published by Universal Subtitles to
// enable subtitle creation and viewing functionality on websites with
// streaming video. For more information, see: http://universalsubtitles.org/
//
// Copyright © 2010 Lawrence Leonard Gilbert
//
// Use of this code is subject to the Creative Commons Attribution-Share Alike
// 3.0 United States License.  For the details of this license, see:
// http://creativecommons.org/licenses/by-sa/3.0/us/

(function(){

    // Make a <script> element
    var script_to_add = document.createElement('script');

    // Add attributes to load Universal Subtitles' script directly from their
    // website, simulating what they recommend webmasters do on their own pages

    script_to_add.type = "text/javascript";
    script_to_add.src =
        "http://s3.www.universalsubtitles.org/js/mirosubs-widgetizer.js";

    // Add the <script> to the <head>
    document.getElementsByTagName('head')[0].appendChild(script_to_add);

    // YouTube: move #watch-panel down. (This is cheating because we don't
    // really check to see if this is a YouTube page!)

    var watch_panel = document.getElementById('watch-panel');
    if (watch_panel) {
        watch_panel.setAttribute('style', 'margin-top:30px;');
    }

})();
