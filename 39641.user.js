// ==UserScript==
// @name           LiveJournal Track from Navbar
// @namespace      http://afunamatata.com/greasemonkey/
// @description    Add a link to track a user's entries from the navbar
// @include        http://*.livejournal.com/*
// @exclude        http://www.livejournal.com/*
// ==/UserScript==

if(document.getElementById("lj_controlstrip"))
{
    var track = document.createElement("a");
    track.appendChild(document.createTextNode("Track"));
    var journalViewed = document.evaluate("./span", document.getElementById("lj_controlstrip_statustext"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    track.setAttribute("href", "http://www.livejournal.com/manage/subscriptions/user.bml?journal="+journalViewed.getAttribute("lj:user"));
 
    var insert = document.evaluate("//div[contains(@class,'appwidget-stylealwaysmine')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    insert.parentNode.insertBefore(document.createTextNode(" "), insert);
    insert.parentNode.insertBefore(track, insert);
}
