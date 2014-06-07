// ==UserScript==
// @name          Market protocol to web market
// @namespace     http://www.brikwarrior.com/market_protocol
// @description   simple script to convert market: links to market.android.com links
// @include       *
// @exclude       http://www.android.com/market/*
// @exclude       http://market.android.com/*
// ==/UserScript==
//
// Copyright (c) 2011, Gino A Melone
// All rights reserved.
// Redistribution and use in source and binary forms, with or without modification,
// are permitted provided that the following conditions are met:
//   * Redistributions of source code must retain the above copyright notice, this list
//     of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright notice, this
//     list of conditions and the following disclaimer in the documentation and/or
//     other materials provided with the distribution.
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
// IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
// NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
// OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

// market://search?q=com.google.android.street
// https://market.android.com/search?q=com.google.android.street

// market://details?id=com.google.android.street
// market://search?q=pname:com.google.android.street
// https://market.android.com/search?q=com.google.android.street

// market://search?q=pub:Google+Inc.
// https://market.android.com/developer?pub=Google+Inc.


var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // do something with thisLink

    if (thisLink.href.match(/^market:\/\/search\?q=pub:/i)) {
        thisLink.href = 'https://market.android.com/developer?pub=' + thisLink.href.substring(22);
    } else {
        if (thisLink.href.match(/^market:\/\/search\?q=pname:/i)) {
            thisLink.href = 'https://market.android.com/search?q=' + thisLink.href.substring(24);
        } else {
            if (thisLink.href.match(/^market:\/\/details\?id=/i)) {
                thisLink.href = 'https://market.android.com/search?q=' + thisLink.href.substring(20);
            } else {
                if (thisLink.href.match(/^market:\/\/search\?q=/i)) {
                    thisLink.href = 'https://market.android.com/search?q=' + thisLink.href.substring(18);
                }
            }
        }
    }
}