// ==UserScript==
// @name        Facebook Always Most Recent
// @namespace   http://userscripts.org/users/86154
// @author      Justin Wheeler
// @version     1.05
// @description Make facebook stop using 'Top News'
// @match       http://facebook.com/*
// @match       https://facebook.com/*
// @match       http://facebook.com/
// @match       https://facebook.com/
// @match       http://*.facebook.com/
// @match       https://*.facebook.com/
// @match       http://*.facebook.com/*
// @match       https://*.facebook.com/*
// @include     http://facebook.com/*
// @include     https://facebook.com/*
// @include     http://facebook.com/
// @include     https://facebook.com/
// @include     http://*.facebook.com/
// @include     https://*.facebook.com/
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
// @require     http://buzzy.hostoi.com/AutoUpdater.js
// ==/UserScript==

var script_id      = 105827;
var script_version = '1.05';

window.addEventListener( 'load', function () { click_on_most_recent() }, true );

function click_on_most_recent() {
    var most_recent_link = document.evaluate(
        "//a/span[text()='Most recent']",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    );

    // Because clicking on 'top news' will trigger an ajax event that doesn't
    // actually result in a window 'load' call, we don't have to make an
    // exception for situations where someone actually wants to click on and
    // view their 'top news', even though facebook has no concept of what
    // anyone's top news really is.
    //
    // (bring on google+)
    if ( most_recent_link.singleNodeValue ) {
        var a_element = most_recent_link.singleNodeValue.parentNode;

        var links_to = a_element.getAttribute('href');

        if ( links_to == '#' ) {
            return;
        }
        else {
            location.href = links_to;
        }
    }
}

if ( typeof autoUpdate == 'function' ) {
    autoUpdate( script_id, script_version );
}
