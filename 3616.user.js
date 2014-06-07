/*
    resizes the content of spiegel
    (c) 2005 Thomas Richter
    http://www.thomas-richter.de/

    Copy, use, modify, spread as you see fit.
    function do_widen grab from tobez@tobez.org
*/

// ==UserScript==
// @name            SpiegelContentResize
// @namespace       http://www.thomas-richter.de/
// @description     resizes the center column of spiegel
// @include         http://www.spiegel.de/*/*.html
// ==/UserScript==

/**
 ** ----------------------------------------------------------------------------
 ** "THE BEER-WARE LICENSE" (Revision 42)
 ** <beerware@thomas-richter.de> wrote this file.  As long as you retain this notice you
 ** can do whatever you want with this stuff. If we meet some day, and you think
 ** this stuff is worth it, you can buy me a beer in return.   Thomas Richter
 ** ----------------------------------------------------------------------------
 **
 ** This is a greasemonkey script, intended for use with the Firefox extension
 ** Greasemonkey.
 ** More info: http://greasemonkey.mozdev.org/
 **
 **/

(function() {
    function do_widen(id, width, min) {
        var container = document.getElementById(id);
        if (!container)
            return;
        if (width)
            container.style.width = width;
        if (min)
            container.style.minWidth = min;
	}
	try {
    do_widen("spMainContent", "75%", "542px");
    do_widen("spArticleBody", "75%", "542px");
    } catch (e) {
        GM_log( 'SpiegelContentResize - script exception: ' + e );
        alert ( 'SpiegelContentResize - script exception: ' + e );
    }
    
})();


