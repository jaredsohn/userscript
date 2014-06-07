// ==UserScript==
// @name             Google docs viewer
// @description    Open PDF/PPT/TIF links with Google's Document Viewer in a new Tab 
// @include          http://*
// @include          https://*
// @exclude         http://docs.google.com/*
// @exclude         https://docs.google.com/*
// @version         1.0
// ==/UserScript==
// Based on the great event driven script by Daniel Lanigan: http://userscripts.org/scripts/show/59870
// and the Jeffrey Parker modification: http://userscripts.org/scripts/show/75334
// and the  Jorpcolombia modification: http://userscripts.org/scripts/show/83260
//
// Only one improve:
// 1. Open the PDF document in a new Tab using the GM_openInTab command.
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
            var dir= 'http://docs.google.com/viewer?url=' + escape(link_href);
            //location.href = dir;
            GM_openInTab(dir);
            e.stopPropagation();

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
    if (anchor.href.match(/^[^?]+\.(pdf|ppt|pps|doc|docx|tif|tiff|xls|xlsx|pptx|odt|ods|odp|odg|sxw|sxc|sxi|sxd)$/)) {
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