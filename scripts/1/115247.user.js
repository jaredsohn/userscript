// ==UserScript==
// @name Pinboard - Dim Saved Links
// @namespace http://murklins.talkoncorners.net/
// @description Dim out any links on Pinboard that you've already saved in your own account.
// @include http://pinboard.in/*
// @include http://www.pinboard.in/*
// @include https://pinboard.in/*
// @include https://www.pinboard.in/*
// ==/UserScript==

// if can't find pinboard element, exit
var main_node;
main_node = document.getElementById("pinboard")
if (!main_node) {
  return;
}

// get the current account name from cookie
var user = "";
var cookie = document.cookie.split(";");
for (var i = 0; i < cookie.length; i++) {
  var cookieItem = cookie[i].replace(/^\s+|\s+$/g,"");
  var userRegex = new RegExp("^login=(.*?)$");
  var userArr = userRegex.exec(cookieItem);
  if (userArr) {
    user = userArr[1];
    break;
  }
}

// are you viewing your own account?
var path = window.location.pathname;
var pathRegex = new RegExp("/u:(.*)");
var pathArr = pathRegex.exec(path);
if (pathArr) {
  var pieces = pathArr[1].split("/");
  if (pieces[0] == user) {
    // this is your account, so don't dim
    return;
  }
}
  
// get all the bookmarks
var bookmarks = document.evaluate("//div[contains(@class, 'bookmark ')]", main_node, null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < bookmarks.snapshotLength; i++) {      
  var b = bookmarks.snapshotItem(i); 
  
  // is this a bookmark that's saved in your account?
  var saved = document.evaluate("./div[contains(@class, 'display')]/a[contains(@class, 'has_bmark')]", 
                                  b, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);                  
  if (saved.snapshotLength > 0) {
    // yes, this link is already saved! give this bookmark the dimming class
    b.className = b.className + " gm_dimSaved";
  }
  else {
    // links saved by you on the global tag/recent/etc pages don't have the "has_bmark" class,
    // so check the user name of the person who saved the bookmark
    if (user != "") {
      var savedBy = "";
      var when = document.evaluate("./div[contains(@class, 'display')]/a[contains(@class, 'when')]", 
                                      b, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
      if (when.snapshotLength > 0) {
        // format is "/u:accountname/b:bookmarkid" so just take the username
        var savedByRegex = new RegExp("/u:(.*?)/");
        var savedByArr = savedByRegex.exec(when.snapshotItem(0).href);
        if (savedByArr) {
          savedBy = savedByArr[1];
        }
      }
      if (savedBy == user) {
        // yes, you saved this link!
        b.className = b.className + " gm_dimSaved";
      }
    }
  }
}
                                    
GM_addStyle(
  '.gm_dimSaved .display, .gm_dimSaved .display div.description { color: #a9a9a9; }' +
	'.gm_dimSaved a { color: #a9a9a9; }' +
	'.gm_dimSaved a.url_link { background: inherit!important; }'
);