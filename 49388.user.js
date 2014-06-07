// ==UserScript==
// @name          Yahoo! Mail Title Tweak
// @namespace     YahooTitleTweakByWayne
// @author        Wayne See
// @version       1
// @description   Append the unread mail count to your browser's title bar
// @include       http://*.mail.yahoo.com/*
// ==/UserScript==

function getFolderCount(element) {
    if (element.childNodes.length > 0) {
        var count = element.firstChild.nodeValue
        return parseInt(count.substr(1,count.length-2))
    } else
        return 0
}

var counts = document.getElementsByClassName("folderCount")
if (counts && counts.length && counts.length > 0) {
    if (document.title.substr(0,1) == "(") //if title starts with (, do not modify anymore
        return
    var total = 0;
    total = getFolderCount(counts[0]) //get the count for Inbox
    for (var i = 4; i < counts.length; i++) { //start at index 4, because 1, 2, 3 correspond to Drafts, Sent and Spam
        total += getFolderCount(counts[i])
    }
    if (total > 0) {
        document.title = "(" + total + " unread) Yahoo! Mail"
    }
}
