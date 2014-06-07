// ==UserScript==
// @name           SortHN
// @namespace      http://www.arandonohue.com/
// @description    Sorts HN front page by (points - comments)
// @include        http://news.ycombinator.com/
// ==/UserScript==

/* A single TBODY contains the list of HN links */
var mainBody = document.evaluate(
    '//HTML/BODY/CENTER/TABLE/TBODY/TR[3]/TD/TABLE/TBODY',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
    ).snapshotItem(0);

/* 
A single HN submission is represented by three rows. 

The first row includes the number, upvote arrow, title, and url. 

The second row includes the number of points, submitter, time of 
submission and number of comments.

The third row is a spacer.

numbersRows is a list of the second rows, so we can get at the 
number of points and number of comments.
*/
var numbersRows = document.evaluate(
    'TR[position() mod 3 = 2 and position() < last() - 2]',
    mainBody,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
    );

/* The 'More' link at the bottom is represented by these two rows. */
var moreRows = document.evaluate(
    'TR[position() >= last() - 2]',
    mainBody,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
    );

/* Given a row, return the number of points for the submission */
var points = function (snapshotItem) {
    return parseInt(document.evaluate(
        'TD[2]/SPAN',
        snapshotItem,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null        
    ).snapshotItem(0).innerHTML);
};

/* Given a row, return the number of comments for the submission */
var comments = function (snapshotItem) {
    return parseInt(document.evaluate(
        'TD[2]/A[2]',
        snapshotItem,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null        
    ).snapshotItem(0).innerHTML) || 0;
};

var ary = []

for (var i = 0; i < numbersRows.snapshotLength; i++) {
    ary.push(numbersRows.snapshotItem(i));
}

/************************************************************
* The fun happens here. Give a submission an absolute score.*
*************************************************************/
var quality = function(snapshotItem) {
    return points(snapshotItem) - comments(snapshotItem);
}

/* Reorder the submissions by reinserting them in a new order*/
ary.sort(function (a,b) {
   return quality(b) - quality(a);
});

for(var i = 0; i < ary.length; i++) {
    var nextSibling = ary[i].nextSibling;
    
    ary[i].parentNode.appendChild(ary[i].previousSibling);
    ary[i].parentNode.appendChild(ary[i]);
    ary[i].parentNode.appendChild(nextSibling);
}

/* Replace the 'More' link at the bottom. */
for(var i = 0; i < moreRows.snapshotLength; i++) {
    moreRows.snapshotItem(i).parentNode.appendChild(moreRows.snapshotItem(i));
}
