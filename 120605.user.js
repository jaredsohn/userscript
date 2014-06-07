// ==UserScript==
// @name          MusicBrainz Random Page Turn
// @namespace     urn:x-l2g.to:userscripts:mb-random-page-turn
// @description   On multi-page search results, pick a random page
// @version       1.3
// @include       http://musicbrainz.org/*
// @include       http://test.musicbrainz.org/*
// ==/UserScript==
//
// Last edition: 2011-12-16
//
// Copyright © 2011 Lawrence Leonard Gilbert
//
// Use of this code is subject to the Creative Commons Attribution-Share Alike
// 3.0 United States License.  For the details of this license, see:
// http://creativecommons.org/licenses/by-sa/3.0/us/

var pageUrlRegex = /([?&]page=)(\d+)/;
var pageNumRegex = /Page \d+ of (?:at least )?(\d+)/;

// Thank you, https://developer.mozilla.org/En/DOM/NodeList
var forEach = Array.prototype.forEach;

// Get all (both) page navigator bars
var pageNavBars = document.getElementsByClassName('pageselector');

if (pageNavBars.length > 0) {

    // Get the number of pages
    var lastPageNum = pageNavBars[0].innerHTML.match(pageNumRegex)[1];

    // Don't bother doing the rest if there are only one or two pages
    if (lastPageNum > 2) {

        // Get the current page link to use as a template, and extract the
        // current page
        var currentPageLink = pageNavBars[0].querySelector('a.sel');
        var currentPageUrl  = currentPageLink.getAttribute('href');
        var currentPageNum  = currentPageUrl.match(pageUrlRegex)[2];

        // Pick a random page that's not the current page
        var randomPageNum;
        do {
           randomPageNum = Math.ceil(Math.random() * lastPageNum);
        } while (randomPageNum == currentPageNum);

        // Construct a URL for it
        var randomPageUrl = currentPageUrl.replace(pageUrlRegex,
                                                "$1" + randomPageNum);

        // Construct a link and add it to the page
        var randomPageLink = document.createElement('a');
        randomPageLink.href = randomPageUrl;
        randomPageLink.textContent = "\u221e";

        forEach.call(pageNavBars, function(pageNavBar){
            pageNavBar.appendChild(randomPageLink.cloneNode(true));
        });
    }
}
