// ==UserScript==
// @name           Classic Shoutcast Now!
// @namespace      tech.nimbus.fi
// @description    Force external player as default (Or other possible settings)
// @include        http://www.shoutcast.com/*
// @version        1.1
// ==/UserScript==
//
//  Version history:
//      1.0   Initial release
//      1.1   Simplified cookie injection (for modern GreaseMonkey)

(function() { // begin closure

    var settings = [
        "Player~"+     "others",  // "popup" == popup window, "others" == external player, "stretched" == window bottom
        "Bandwidth~"+  "ALL",     // "128" == broadband, "127" == narrowband, "ALL" == show all stations
        "Codec~"+      "ALL"
    ];

    document.cookie = "Settings="+ settings.join("|") +"; path=/";  // inject cookie

})(); // end closure

// eof
