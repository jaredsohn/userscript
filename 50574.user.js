// --------------------------------------------------------------------------------
// Copyright (C) 2009  Cui Mingda [ https://twitter.com/cuimingda ]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Koubei Homepage S&D Viewer
// @namespace       http://userscripts.org/scripts/show/50574
// @description     View all the 40 supply and demand records in the homepage at the same time
// @include         http://beijing.koubei.com/
// @include         http://shanghai.koubei.com/
// @include         http://hangzhou.koubei.com/
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
//
// This is a Greasemonkey 0.8 script, you need to install Firefox (http://www.mozilla.com/firefox/)
// and Greasemonkey (https://addons.mozilla.org/firefox/addon/748) first.
// --------------------------------------------------------------------------------

;(function() {
    if($("#requests").length === 0 || $("#scroll-text").length === 0) {
        return false;
    }

    var scrollHeight = "475px";

    $("#requests").css({
        "height" : scrollHeight,
        "background" : "none",
        "border" : "1px solid #ccc"
    }).find("#scroll-text").css("height", scrollHeight);
  
})();

/* Update History
 * 0.1 @ 2009/05/31 # Initial Release
 * 0.2 @ 2009/06/02 # Support Beijing, Shanghai and Hangzhou homepage
 */