// ==UserScript==
// @name          Force Wrap
// @namespace     http://zoolcar9.lhukie.net/mozilla/userscripts/
// @include       *
// @exclude       http://mail.google.com/*
// @description	  Wrap text automatically. Based on Jesse Rudderman's bookmarklet Force Wrap (http://xrl.us/hsn3) and Reset body HTML (http://xrl.us/hsn5).
// ==/UserScript==

function F(n) {
  var u, r, c, x;
  if(n.nodeType == 3) {
    u = n.data.search(/\S{30}/);
    if(u >= 0) {
      r = n.splitText(u + 30);
      n.parentNode.insertBefore(document.createElement('WBR'), r);
    }
  } else if(n.tagName != 'STYLE' && n.tagName != 'SCRIPT' && n.tagName != 'PRE') {
    for (c = 0; x = n.childNodes[c]; ++c) {
      F(x);
    }
  }
}

F(document.body);
//document.body.parentNode.insertBefore(document.body, document.body);

// Coded added to fix regression is Firefox 2.0/3.0 dev builds
// Ripped from MR Tech Link Wrapper 2.0.2
var thisE = document.body;
var p = thisE.parentNode;
var n = thisE.nextSibling;
p.removeChild(thisE);
p.insertBefore(thisE, n);

