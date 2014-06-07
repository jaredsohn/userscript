// ==UserScript==
// @name           Improved PDF/PPT/TIF viewer with Google Docs (Event Driven)
// @namespace      http://jeffrey-parker.com
// @include        http://*
// @exclude        http://docs.google.com/*
// ==/UserScript==
// Based on the great event driven script by Daniel Lanigan: http://userscripts.org/scripts/show/59870
//
// Daniel's script is a great Google Doc viewer because it only activates upon clicking, so users can still
// right-click a pdf link and download it.
//
// This version improves it in 3 ways:
// 1) Properly uses a function generator, so it can handle pages with more than one PDF link
// 2) Escapes the URL, allowing it to work with files with special characters
// 3) Written in fully-expanded javascript, making it easier to read and debug. Passes most JSlint validation
//
// Released under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0.html
//

/*global location: false, window: false, escape: true, document: true, href: true */

// exclude should take care of this, but just to be sure...
if (location.href.indexOf("http://docs.google.com/") !== -1) {
    return;
}

function hrefFunctionGenerator(link_href) {
    return function (e) {
            if (!e) {
                var e = window.event;
            }
            location.href = 'http://docs.google.com/viewer?url=' + escape(link_href);
            if (e.preventDefault) {
                e.preventDefault();
            }
            else {
                e.returnValue = false;
            }
        };
}

var i = 0, anchor, anchor_list = document.getElementsByTagName("a");
while (anchor_list[i]) {
    anchor = anchor_list[i];
    if (anchor.href.match(/^[^?]+\.(pdf|ppt|tif)$/)) {
        if (anchor.addEventListener) {
            anchor.addEventListener('click', hrefFunctionGenerator(anchor.href), false);
        }
        else if (anchor.attachEvent) {
            anchor.attachEvent('onclick', hrefFunctionGenerator(anchor.href));
        }
        else {
            href = 'http://docs.google.com/viewer?url=' + escape(anchor.href);
        }
    }
    i++;
}

