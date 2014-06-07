// ==UserScript==
// @name           PornBay.org auto-refresh
// @namespace      d5084892-7db4-4e3a-9895-cd057806d658
// @description    Automatically refresh when PornBay.org gives the "Lost connection, refresh" etc response
// @include        http://pornbay.org/*
// @include        http://www.pornbay.org/*
// ==/UserScript==

"use strict";

function auto_refresh() {
    var refreshNode = null;

    // This should be reasonably fast.
    var headings = document.getElementsByTagName('h3');
    if(headings.length > 0 && headings[0].textContent == "Lost connection, refresh.")
        refreshNode = headings[0];

    // Don't use body.textContent, as that will take lots of time on larger
    // pages. This is probably the fastest way.
    else if(document.body.firstChild.nodeType == 3 &&
            document.body.firstChild.data == "Too many users. Refresh.")
        refreshNode = document.body;

    if(refreshNode)
    {
        refreshNode.innerHTML += "<br/>Auto-refreshing... ;)";
        setTimeout(document.location.reload, 500);
    }
}

auto_refresh();
