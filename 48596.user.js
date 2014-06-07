// ==UserScript==
// @name           wefunkradio show download
// @namespace      http://www.wefunkradio.com/
// @description    Professor Groove and DJ Static team up and break it down to the deep funk, underground hip-hop, and rare grooves on the weekly show WEFUNK. This scripts adds a download link for the mp3 file.
// @include        http://www.wefunkradio.com/show/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==

function GM_main ($) {
	var showDate = window.location.pathname.split('/')[2];
	var showNumber = $("#hwrap h1").text().split(' ')[1];

	var downloadUrl = "http://www.wefunkradio.com/mirror/stream/"+showDate+"/"+showNumber;

	$("#hwrap").append("<a href=\""+downloadUrl+"\">[Download show]</a>");
}

if (typeof jQuery === "function") {
    console.log ("Running with local copy of jQuery!");
    GM_main (jQuery);
}
else {
    console.log ("fetching jQuery from some 3rd-party server.");
    add_jQuery (GM_main, "1.7.2");
}

function add_jQuery (callbackFn, jqVersion) {
    var jqVersion   = jqVersion || "1.7.2";
    var D           = document;
    var targ        = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    var scriptNode  = D.createElement ('script');
    scriptNode.src  = 'http://ajax.googleapis.com/ajax/libs/jquery/'
                    + jqVersion
                    + '/jquery.min.js'
                    ;
    scriptNode.addEventListener ("load", function () {
        var scriptNode          = D.createElement ("script");
        scriptNode.textContent  =
            'var gm_jQuery  = jQuery.noConflict (true);\n'
            + '(' + callbackFn.toString () + ')(gm_jQuery);'
        ;
        targ.appendChild (scriptNode);
    }, false);
    targ.appendChild (scriptNode);
}