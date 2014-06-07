// OssNoteFix
// version 0.1 BETA!
// 2005-05-18
// Copyright (c) 2005, DJ Adams

// OssNoteFix
//
// ==UserScript==
// @name          OssNoteFix
// @namespace     http://www.pipetree.com/qmacro
// @description   Make OSS note pages more useable
// @include       https://*.sap-ag.de/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//

var textnodes, node, s, newNode, fnote;

// This is the URL to invoke an OSS note. Ugly, eh?
var linkurl = "<a href='http://service.sap.com/~form/handler?_APP=01100107900000000342&_EVENT=REDIR&_NNUM=$1'>$1</a>";

// Right now, an OSS note number is 5 or 6 consecutive digits,
// between two word boundaries. Should be good enough for now.
var ossmatch = /\b(\d{5,6})\b/g;

// Act upon the 'main' framed document which has a form 'FNOTE'
// and the title 'SAP Note'.
if ((fnote = document.FNOTE) && document.title.match('SAP Note')) {

  // Get stuffed, evil frames!
  if (top.document.location != document.location) {
    top.document.location = document.location;
  }

  // Make a useful document title from the OSS note number,
  // found in the FNOTE form's _NNUM input field, and the
  // OSS note title (which is in the first H1 element.
  var h1 = document.getElementsByTagName('h1')[0];
  var heading = h1.firstChild.data;
  heading = heading.replace(/^\s*(.+?)\s*$/, "$1");
  document.title = fnote._NNUM.value + " - " + heading;

  // Make the plain text references to OSS notes into a href links
  // pointing to their home in http://service.sap.com
  textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

  for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;

    // Got a match? Make it into a link
    if (s.match(ossmatch)) {
      newNode = document.createElement('div');
      newNode.innerHTML = s.replace(ossmatch, linkurl);
      node.parentNode.replaceChild(newNode, node)
    }

  }

}


