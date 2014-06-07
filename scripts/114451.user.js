// ==UserScript==
// @name Pinboard - Date Lines
// @namespace http://murklins.talkoncorners.net
// @description Add a line between different dates.
// @include http://pinboard.in/*
// @include https://pinboard.in/*
// @include http://www.pinboard.in/*
// @include https://www.pinboard.in/*
// @exclude http://pinboard.in/add*
// @exclude http://www.pinboard.in/add*
// @exclude https://pinboard.in/add*
// @exclude https://www.pinboard.in/add*
// ==/UserScript==

var main_node = document.getElementById("pinboard");

// get all the bookmarks
var doExit = false;
if (main_node) {
  var bookmarks = document.evaluate("//div[contains(@class, 'bookmark ')]", main_node, null,
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                    null);
  if (bookmarks.snapshotLength == 0) {
    doExit = true;
  }
}
else {
  doExit = true;
}

if (doExit) {
  GM_log("Couldn't get bookmark list. Exiting script.");
  return;
}

var curDate = "";
for (var i = 0; i < bookmarks.snapshotLength; i++) {      
  var b = bookmarks.snapshotItem(i); 
  
  var when = document.evaluate("div[contains(@class, 'display')]/a[contains(@class, 'when')]", b, null,
                              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                              null);
  if (when.snapshotLength == 1) {
    when = when.snapshotItem(0);
    var displayDate = "";
    var newDate = when.getAttribute("title");
    var daysAgo = when.innerHTML;
    if (daysAgo.indexOf("just now") != -1 || daysAgo.indexOf(" minute ago") != -1 || 
          daysAgo.indexOf(" minutes ago") != -1 || daysAgo.indexOf(" hour ago") != -1 || 
          daysAgo.indexOf(" hours ago") != -1) {
      newDate = "today";
      displayDate = newDate;
    }
    else if (daysAgo.indexOf(" days ago") != -1 || daysAgo.indexOf("yesterday") != -1) {
      // split "days ago" off the string
      var datePieces = daysAgo.split(" ");
      newDate = datePieces[0];
      displayDate = daysAgo;
    }
    else {
      // strip "2011.09.25 &nbsp; 14:11:36" format down to just date
      var datePieces = newDate.split(" ");
      newDate = datePieces[0];
      displayDate = newDate;
    }
    if (newDate != curDate) {
      curDate = newDate;
      
      // add the date div
      var div = document.createElement("div");
      div.className = "gm_datelines_newdate";
      div.innerHTML = displayDate;
      var firstKid = b.firstChild;
      b.insertBefore(div, firstKid);
    }
  }
}

GM_addStyle(
	'div.gm_datelines_newdate { border-bottom: 1px solid #777; margin-bottom: 5px; }'
);