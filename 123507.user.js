// ==UserScript==
// @name       Trademe feedback item descriptions
// @namespace  http://drsr/
// @version    0.9
// @description  Adds auction item description and price (where available) to feedback listing
// @include    http://www.trademe.co.nz/Members/Feedback.aspx*
// @include    /http:\/\/www.trademe.co.nz\/stores\/.*\/feedback/
// @grant      GM_addStyle
// @grant      unsafeWindow
// @copyright  public domain
// ==/UserScript==
/*
* Changes:
* v0.9 Avoid double item descriptions from feedback filter script
* v0.8 Fix for more stores
* v0.7 Fix unescaped tags in auction titles
* v0.5 Fix for stores
* v0.4 Fixed bug that stopped new menu dropdowns working
* v0.3 Greasemonkey 1.0
* v0.2 add breadcrumbs for each item, slight speedup
*/


// replace trademe's JS error handler
window.onerror=function(msg, url, linenumber){
//    console.log('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
        return true;
            };

// use TM's jQuery
var $ = unsafeWindow.jQuery;

var listingQueue = [];
function listingItem(auctionUrl, feedbackItem) {
    this.auctionUrl = auctionUrl;
    this.feedbackItem = feedbackItem; // first row of feedback item
}

var timer;
function queueNext(delay) {
    if (listingQueue.length == 0) {
//        console.log("Queue empty");
    } else {
        // get the next listing when the timer expires
        timer = setTimeout(function() {
            getListing(listingQueue.shift());
      }, delay);
    }
}

var ITEM_DONE_MARKER = "tmfbid_done";
function getListing(listingItem) {
    $.get(listingItem.auctionUrl, function(listing) {
        var auctionTitle = $("#ListingTitle_title", listing).text();
        var winningBid = $("#ListingTitle_auctionTitleBids", listing).text();
        var breadCrumbs = $(".listingBreadCrumbs", listing).html();
        var $feedbackItem = $(listingItem.feedbackItem);
        // Check the "Trademe feedback filter hasn't added a description while we were getting this page
        if (!$feedbackItem.hasClass(ITEM_DONE_MARKER)) {
            $feedbackItem.addClass(ITEM_DONE_MARKER);
            if (auctionTitle) {
                // Add with entities in auction title escaped
                $feedbackItem.after("<tr><td>&nbsp;</td><td>" + $("<p/>").text(auctionTitle).html() + "</td><td>" + winningBid + "</td></tr>");
            }
            if (breadCrumbs) {
                $feedbackItem.after("<tr><td>&nbsp;</td><td colspan=2 class='tmfbid_bc'>" + breadCrumbs + "</td></tr>");
            }
        } else {
            console.log("other script already filled " + $feedbackItem.text());
        }
    });
    // request next listing after timer delay
    queueNext(200);
}

// return TD that holds the feedback table header, items, and footer
// header and footer are table(1) and (3) under this, items list is table(2)
function feedbackTableContainer() {
    // layout varies wildly according to store features, so work up from the 
    // "Latest n feedbacks" header
    var ret = $("#mainContent small:contains('Latest'):eq(0)").parents("td:eq(1)");
    return ret;
}

// link style for breadcrumbs to match style used in main listing
GM_addStyle(".tmfbid_bc a{color:#0066CC; text-decoration:none;}");

// for the first row in every feedback item (only row with valign="top")
$("> table:eq(2) > tbody > tr[valign='top']", feedbackTableContainer()).each(
    function(index, feedbackItem) {
        // fourth column contains the auction link
        var auctionUrl = $("td:eq(3) > table > tbody > tr a", feedbackItem).attr("href");
        if (auctionUrl) {
            // rate-limit listing page requests by queuing them
            listingQueue.push(new listingItem(auctionUrl, feedbackItem));
        }
    });
// start fetching listing pages
queueNext(10);
