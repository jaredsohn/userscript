// ==UserScript==
// @name Direct Links in Google Search
// @namespace https://github.com/astanin
// @description Remove indirections from Google search results on all TLDs.
// @include https://www.google.com.hk/search?q*
// @include https://www.google.com/search?q*
// @version 2.2
// @grant   none
// ==/UserScript==

// Version 2.2
// - rewrite using DOMNodeInserted and getElements* to support Chromium too
// - enable on encrypted.google.com
// - try to fix new-style classless links in search results (/url?q=...)
//
// Version 2.1
// - enable on plain Google search page, now it works with Instant too
//
// Version 2.0 (Direct Links in Google Search)
// - fork "Less Google", which is not working any more, and rename
// - enable on all Google top-level domains (only .com and .ca in Less Google)
// - enable on new HTTPS search pages (HTTP still supported, just in case)
// - remove deprecated @exclude patterns (search URLs have been changed)
// - don't allow any "onmousedown" link modifications
//
// Version 1.1 (Less Google by @clump)
// - change include to only apply to search results
//   (maps and images are too slow)
//
// Version 1.0 (Less Google by @clump)

function fixLinksOfClassL() {
    // fix old-style class="l" links
    var ts = document.getElementsByClassName("l");
    for (var i=0; i < ts.length; i++) {
        var t = ts[i];
        if (t.tagName == "A") {
            // remove javascript callback first
            t.removeAttribute("onmousedown");
            // fix link if necessary
            var href = t.getAttribute("href");
            var m = href.match(/url?sa/);
            if (t.getAttribute("data-href")) {
                t.setAttribute('href',t.getAttribute("data-href"));
            }
        }
    }
    return ts.length;
}

function fixClasslessLinks() {
    // fix new classless links (noticed in some search results)
    var results = document.getElementById("search");
    var ts = results.getElementsByTagName("A");
    for (var i=0; i < ts.length; i++) {
        t = ts[i];
        t.removeAttribute("onmousedown");
        var href = t.getAttribute("href");
        var m = href.match(/\/url?.*q=([^&]*)/)
        if (m) {
            t.setAttribute('href',decodeURIComponent(m[1]));
        }
    }
    return ts.length;
}

function cleanPage() {
    var n = fixLinksOfClassL();
    if (n == 0) {
        fixClasslessLinks();
    }
}

document.addEventListener('DOMNodeInserted',cleanPage,false);
cleanPage();
