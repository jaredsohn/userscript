// --------------------------------------------------------------------------------
// Copyright (C) 2009  Cui Mingda [ https://twitter.com/cuimingda ]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Dogadoga Download Helper
// @namespace       http://userscripts.org/
// @description     convert play link to download link on dogadoga.com
// @include         http://dogadoga.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
//
// This is a Greasemonkey 0.8 script, you need to install Firefox (http://www.mozilla.com/firefox/)
// and Greasemonkey (https://addons.mozilla.org/firefox/addon/748) first, and then
// reinstall this script.
// --------------------------------------------------------------------------------

;(function() {

    function pick(str, re) {
        var result = str.match(re);
        return (result && result.length === 2) ? result[1] : result;
    }

    $("a[href*=detail.php]").click(function(e) {
        e.preventDefault();

        var videoId = pick(this.href, /detail\.php\?v=(.+)$/);
        alert("preparing video(" + videoId + ")...");
        $.get("detail.php", { "v" : videoId }, function(data) {
            location.href = pick(data, /file=([^&]+)/).replace("media.agesage.jp", "112.137.189.183");
            alert("downloading video(" + videoId + ")...");
        });
        
    });
    
})();