// ==UserScript==
// @name       Trademe feedback filter
// @namespace  http://drsr/
// @version    1.2
// @description  Show negative, neutral, and incomplete feedback only
// @include    http://www.trademe.co.nz/Members/Feedback.aspx*
// @include    http://www.trademe.co.nz/stores/*
// @grant      unsafeWindow
// @grant      GM_addStyle
// @copyright  public domain
// ==/UserScript==
// v1.2: Fix sort for change in date format in feedback list
// v1.1: Avoid double item descriptions from feedback item descriptions script
// v1.0: Add descriptions and breadcrumbs for items, if they haven't already been added by "Trademe feedback item descriptions" script
// v0.9: Work around Trademe feedback paging bug
// v0.8: Last version didn't work in Firefox
// v0.7: Fix for more stores. Note as of 2/9/2013 there is a TM feedback paging bug for some stores where all the feedback paging links go to page 1.
// v0.6: Fix grants for newer versions of Chrome
// v0.5: Fix for stores
// v0.4: Greasemonkey 1.0
// v0.3: progress bar, sort negs
// v0.2: minor tidy
// TODOS: 
// Options for only negs, only neutral, only incomplete?
// Spacer showing number of positives between negs
var SAD_FACE_IMAGE = "/images/sad_face1.gif";
var HAPPY_FACE_IMAGE = "/images/happy_face1.gif";
var NEUTRAL_FACE_IMAGE = "/images/neutral_face1.gif";
// replace trademe's JS error handler
window.onerror=function(msg, url, linenumber){
        console.log('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
};
var myJQ = unsafeWindow.jQuery;
var feedbackTable = {};
var pageGets = [];
var negativeFeedbacks = [];
var progressCounter = 0;

// return TD that holds the feedback table header, items, and footer
// header and footer are table(1) and (3) under this, items list is table(2)
function feedbackTableContainer(page) {
    // layout varies wildly according to store features, so work up from the 
    // "Latest n feedbacks" header
    var ret = myJQ("#mainContent small:contains('Latest'):eq(0)", page).parents("td:eq(1)");
    return ret;
}

// get any neg items out of the supplied table, save to negativeFeedbacks global
function findNegsIn(thisFeedbackTable) {
    myJQ("tr[valign='top']:has(img)", thisFeedbackTable).each( // the "trader responded" line also has valign=top, so only pick rows with the feedback icon images
        function(index,feedbackRow) {
            var feedbackIcon = myJQ("td:first > img", feedbackRow);
            if (feedbackIcon.attr("src") != HAPPY_FACE_IMAGE) {
      			// copy all rows till the next feedback item
                // TODO better nextUntil selector would be good, will break if any other images used in feedback list
                var rows = myJQ(feedbackRow).nextUntil(":has(img)").andSelf(); // andSelf puts the found row at the start of the JQ array (document order)
                negativeFeedbacks.push(rows); 
            }
        });
}
function findFeedbackTable(page) {
    return myJQ("> table:eq(2)", feedbackTableContainer(page));
}
function prepareFeedbackTable() {
    var tableInThisPage = findFeedbackTable(document);
    findNegsIn(tableInThisPage);
    tableInThisPage.html('<tr id="progressRow"><td>Loading...</td><td colspan="2"><progress id="progressBar" value="0" max="100" style="margin: 0 auto; width:540px;"/></td></tr><tr><td colspan="3"> </tr></tr>');

    // hide headers and footers with links to other pages
    myJQ("> table:eq(1), > table:eq(3)", feedbackTableContainer(document)).hide();
    
    return tableInThisPage;
}
function displayNegs(displayTable, negs) {
    myJQ("#progressRow").html('<td colspan="3"> </td>');
    myJQ(negs).appendTo(displayTable);
}
function showProgress(percent) {
    myJQ("#progressBar").attr("value", percent);
}
function findNegsInOtherPages() {
    // links to other pages at the top of the feedback table, but not "<<" and ">>"
    var otherPageLinks = myJQ('> table:eq(1) a', feedbackTableContainer(document)).not('[text="<<"],[text=">>"]');
    otherPageLinks.each(
        function(index, link) {
            // workaround feedback link bug on some store pages
            var fixedLink = link.href.replace("feedback&page", "feedback?page");
            // save the get result so we can wait for it to complete
            pageGets.push(
                myJQ.get(fixedLink, function(feedbackPage) {
                    findNegsIn(findFeedbackTable(feedbackPage));
                    ++progressCounter;
                    showProgress(parseInt(progressCounter*100/otherPageLinks.length));
            }));
        }
    );
}
function extractDate(dateRow) {
    // date is third column in first row of feedback item
    var textDate = myJQ("td:eq(2)",dateRow).text();
    var splitDate = textDate.split("/");
    return new Date(2000+Number(splitDate[2]),Number(splitDate[1])-1,Number(splitDate[0]));
}
function sortNegs() {
    negativeFeedbacks.sort(function(a, b) {
        return extractDate(b[0]) - extractDate(a[0]);
    });
}

var ITEM_DONE_MARKER = "tmfbid_done";
function addItemDescription(feedbackItem) {
    // fourth column contains the auction link
    var auctionUrl = myJQ("td:eq(3) > table > tbody > tr a", feedbackItem).attr("href");
    if (auctionUrl) {
        myJQ.get(auctionUrl, function(listing) {
            $firstRow = myJQ(feedbackItem[0]);
            $firstRow.addClass(ITEM_DONE_MARKER);
            var auctionTitle = myJQ("#ListingTitle_title", listing).text();
            var winningBid = myJQ("#ListingTitle_auctionTitleBids", listing).text();
            var breadCrumbs = myJQ(".listingBreadCrumbs", listing).html();
            if (auctionTitle) {
                // Add with entities in auction title escaped
                $firstRow.after("<tr><td>&nbsp;</td><td>" + myJQ("<p/>").text(auctionTitle).html() + "</td><td>" + winningBid + "</td></tr>");
            }
            if (breadCrumbs) {
                $firstRow.after("<tr><td>&nbsp;</td><td colspan=2 class='tmfbid_bc'>" + breadCrumbs + "</td></tr>");
            }
        });
    }
}

function addItemDescriptions() {
    myJQ(negativeFeedbacks).each(
        function(index, feedbackItem) {
            // if it doesn't already have a description from the "Trademe feedback item descriptions" script
            if (!myJQ(feedbackItem).hasClass(ITEM_DONE_MARKER)) {
                addItemDescription(feedbackItem);
            }
        });    
}

function filterFeedback(eventObject) {
    // stop a second click on the faces, as it will find all the loaded negs and repeat them
    myJQ("#sadFace, #neutralFace").unbind();

    // link style for breadcrumbs to match style used in main listing
    GM_addStyle(".tmfbid_bc a{color:#0066CC; text-decoration:none;}");
    
    feedbackTable = prepareFeedbackTable();
    findNegsInOtherPages();
    // sort and display when all pageGets are done
    // apply() because when() doesn't take an array argument
    myJQ.when.apply(null,pageGets).then(function() {
        sortNegs();
        addItemDescriptions();
        displayNegs(feedbackTable, negativeFeedbacks);
    });
}
function addClickToFace(faceImage, faceId) {
    var face = myJQ("img[src='" + faceImage + "']").first();
    face.wrap(
        myJQ("<a/>", 
             { href: 'javascript:void(0)',
              id: faceId,
              title: 'click for neutral, negative, and incomplete feedback only',
              click: filterFeedback
              }
            ));
}
function addClickToFaces() {
    addClickToFace(SAD_FACE_IMAGE, "sadFace");
    addClickToFace(NEUTRAL_FACE_IMAGE, "neutralFace");
}
addClickToFaces();