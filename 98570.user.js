// ==UserScript==
// @id             Repair Google Cache Links
// @name           Repair Google Cache Links
// @namespace      http://dango-akachan.appspot.com
// @description    Repair Google Cache Links (because of GFW) 
// @author         tuantuan <dangoakachan@gmail.com>
// @version        0.2
// @include        http://www.google.com.hk/search*
// @include        http://www.google.com.hk/webhp*
// @include        http://www.google.com/search*
// @include        http://www.google.com/webhp*
// @include        http://ipv6.google.com/search*
// @include        http://ipv6.google.com/webhp*
// @include        https://encrypted.google.com/search*
// @include        https://encrypted.google.com/webhp*
// @include        https://www.ggssl.com/search*
// @include        https://www.ggssl.com/webhp*
// ==/UserScript==

/*
 * This scripts has these functions:
 * 1. Repair Google cache with gggssl.com
 */

    var results = document.getElementById("ires").getElementsByTagName("a");

    for (var i = 0; i < results.length; i++) {
        // Google cache repair
        if (results[i].href.indexOf("http://webcache.googleusercontent.com") != -1)
            results[i].href = results[i].href.replace("http://webcache.googleusercontent.com", 
                    "https://www.ggssl.com/cache");}
