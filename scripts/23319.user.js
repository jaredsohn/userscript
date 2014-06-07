// ==UserScript==
// @name           AICN TinyURL Activator
// @namespace      http://userscripts.org/users/46206
// @description    Makes TinyURLs in Ain't It Cool News talkbacks clickable
// @include        http://www.aintitcool.com/talkback_display/*
// ==/UserScript==
//
// Author          Brand Loyalist 
// Date            Wed 2008-02-27 

// == Declarations ============================================================

AICNTinyUrls = {};

AICNTinyUrls.processPage = function (nl) {

  // Add css classes defining unobtrusive styles for linkified links
  // 
  GM_addStyle(
    "a.activated-comment-url { font-weight: normal; }\n"
  + "a.activated-url { text-decoration: none; }\n"
  + "a.activated-url:hover { text-decoration: underline; color: #000000 }\n" );

  // If not for the need to use slightly different css in subject and comment
  // links, would probably be faster to skip the XPath searches and just run
  // string.replace() on the entire page.  Anyway:

  // Linkify subjects
  //
  var subjects = document.evaluate("//td[@class='talkback']//a[@name]", 
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  this.processNodes(subjects,'activated-url');

  // Linkify comment bodies
  //
  var comments = document.evaluate("//td[@class='talkbackcomment']", 
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  this.processNodes(comments,'activated-url activated-comment-url');
}

AICNTinyUrls.processNodes = function (nl,stylings) {
  for (var i=0; i<nl.snapshotLength; i++) {
    var tbel = nl.snapshotItem(i);
    tbel.innerHTML = this.activateURLs(tbel.innerHTML,stylings);
  }
}

AICNTinyUrls.activateURLs = function (txt,stylings) {
  // Look for TinyURLs in given string; linkify them, adding given classes
  return txt.replace(/\bhttp:\/\/tinyurl.com\/[a-z0-9]+\/?/i,
    '<a href="$&" target="_blank" class="' + stylings + '">$&</a>');
}

// == Main ====================================================================

AICNTinyUrls.processPage();

// fin
